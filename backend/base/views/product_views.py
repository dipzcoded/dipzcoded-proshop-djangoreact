from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from base.models import Product,Review
from base.serializers import ProductSerializer




@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,slug):
    product = Product.objects.get(slug=slug)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,slug):
    user = request.user
    product = Product.objects.get(slug=slug)
    data = request.data

    # 1 review already exists
    alreadyExist = product.review_set.filter(user=user).exists()
    if alreadyExist:
        content = {'detail' : 'Product already reviewed'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)

    # 2 No rating or 0
    elif data['rating'] == 0:
        content = {'detail' : 'Please select a rating'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
        
    # 3 Create Review
    else :
        review = Review.objects.create(
            user=user,
            product=product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment']
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating
        
        product.rating = total / len(reviews)
        product.save()

        return Response('Review added')


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProductById(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('product deleted successfully!')




    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

