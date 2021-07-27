from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, OrderItem, Order, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer
from rest_framework import status
from datetime import datetime
import stripe
import environ
# Initialise environment variables
env = environ.Env()
environ.Env.read_env()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0 :
        return Response({'detail':'No order Items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        #(1) create Order
        order = Order.objects.create(
            user=user,
            paymentMethod= data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )

         #(2) create shipping address
        shippingAddress = ShippingAddress.objects.create(
             order=order,
             address=data['shippingAddress']['address'],
             city = data['shippingAddress']['city'],
             postalCode = data['shippingAddress']['postalCode'],
             country = data['shippingAddress']['country'],
             shippingPrice = data['shippingPrice']
         )

         #(3) create orderitems and set the order to orderitems relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                 product=product,
                 order=order,
                 name=product.name,
                 qty = i['qty'],
                 price = i['price'],
                 image=product.image.url,
             )
            
            #(4) update product stock
            product.countInStock -= item.qty
            product.save()
        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'not authorized'},status=status.HTTP_401_UNAUTHORIZED)
    except:
        return Response({'detail':'order does not exist'},status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    try:
        order = Order.objects.get(_id=pk)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        return Response('Order was paid')
    except:
        return Response({'detail':'order does not exist'},status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request,pk):
    try:
        order = Order.objects.get(_id=pk)
        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save()
        return Response('Order was delivered')
    except:
        return Response({'detail':'order does not exist'},status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPaymentIntent(request):
    try:
        
        data = request.data
        amount = data['amount']
        currency = data['currency']
        orderId = data['order_id']
        # customerInfo = data['user_info']
       
        payment_method_type = data['paymentMethodType']

        intent = stripe.PaymentIntent.create(
                amount = amount,
                currency=currency,
                payment_method_types = [payment_method_type],
                metadata = {
                    'order_id' : orderId,
                    
                },
            )

        return Response({'clientSecret':intent['client_secret']})
    except stripe.error.StripeError as e:
        return Response({'error' : {'message' : e.user_message}},status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error' : {'message' : e.user_message}},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getPubKey(request):
     pubkey = env('STRIPE_PUBKEY')
     return Response({'pubkey':pubkey})




    
