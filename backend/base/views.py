from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('hello')

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

