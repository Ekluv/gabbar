from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from . import models


class SignupSerializer(serializers.ModelSerializer):
    """Signup Serializer class"""

    def validate_password(self, value):
        return make_password(value)

    class Meta:
        model = models.User
        fields = ('id', 'first_name', 'last_name', 'mobile', 'gender', 'email', 'password', 'profession')
        extra_kwargs = {
            'last_name': {"error_messages": {"blank": "last name is required"}},
            'mobile': {"error_messages": {"blank": "mobile is required"}},
            'gender': {"error_messages": {"blank": "gender is required"}},
            'email': {"error_messages": {"blank": "email is required"}},
            'password': {"error_messages": {"blank": "password is required"}},
            "first_name": {"error_messages": {"blank": "first name is required"}},
            'profession': {"error_messages": {"blank": "profession is required"}}
        }


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=255)

    class Meta:
        extra_kwargs = {
            'email': {"error_messages": {"blank": "email is required"}},
            'password': {"error_messages": {"blank": "password is required"}}
        }
