from django.urls import path

from . import views

from rest_framework_jwt.views import obtain_jwt_token

app_name = 'account'
urlpatterns = [
   path('signup', views.Signup.as_view(), name='user_signup'),
   path('login', views.Login.as_view(), name='user_login'),
   path('api-token-auth/', obtain_jwt_token),
]
