
from django.urls import path
from base.views import user_views as views



urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/',views.getUserProfile,name="user-profile"),
    path('profile/update/',views.updateUserProfile,name="update-user-profile"),
    path('register/',views.reqisterUser,name="register"),
    path('',views.getAllUsers,name="getusers"),   
    path('<int:pk>/',views.getUserById,name="user"),
    path('delete/<int:pk>/',views.deleteUserById,name="user-delete"),
    path('update/<int:pk>/',views.updateUserById,name="user-update"),

]