from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes,name="routes"),
    path('products/',views.getProducts,name="products"),
    path('products/<slug:slug>/',views.getProduct,name="product"),
]