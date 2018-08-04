from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

# Create your views here.

from account import serializers


class Signup(APIView):
    """
    Signup APIView
    """

    def post(self, request):
        serializer = serializers.SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return Response({'token': token, 'payload': payload }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    """
    """
    def post(self, request):
        serializer = serializers.LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=request.data['email'], password=request.data['password'])
            if user:
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                return Response({'token': token, 'payload': payload }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': ['Either email or password is invalid']}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
