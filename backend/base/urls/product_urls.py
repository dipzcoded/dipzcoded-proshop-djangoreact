from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('',views.getProducts,name="products"),
    path('<slug:slug>/',views.getProduct,name="product"),
    path('delete/<int:pk>/',views.deleteProductById,name="delete-product"),

]
