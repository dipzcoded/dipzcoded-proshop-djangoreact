from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from stripe.api_resources import price
from base.models import Product
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

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProductById(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('product deleted successfully!')




    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

