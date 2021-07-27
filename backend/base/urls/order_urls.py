from django.urls import path
from base.views import order_views as views



urlpatterns = [ 
    path('create-payment-intent/',views.createPaymentIntent,name="createpaymentintents"),
    path('get-publishkey/',views.getPubKey,name="getpublishkey"),
    path('add/',views.addOrderItems,name="orders-add"),
    path('myorders/',views.getMyOrders,name="myorders"),
    path('',views.getOrders,name="get-orders"),
    path('<str:pk>/',views.getOrderById,name="user-order"),
    path('<str:pk>/pay/',views.updateOrderToPaid,name="pay"),
    path('<str:pk>/deliver/',views.updateOrderToDelivered,name="deliver"),

    
]