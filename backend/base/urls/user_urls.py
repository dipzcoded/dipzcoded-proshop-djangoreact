from django.urls import path
from base.views import user_views as views



urlpatterns = [
     path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/',views.getUserProfile,name="user-profile"),
    path('',views.getAllUsers,name="getusers"),
    path('register/',views.reqisterUser,name="register"),

]