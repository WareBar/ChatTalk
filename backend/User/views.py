from django.shortcuts import render
from User.models import User
from User.serializers import UserSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework import views

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #list of reference to look at when creating a new one (in system perspective)
    serializer_class = UserSerializers
    permission_classes = [AllowAny]

    


class UserProfileView(views.APIView):
    """
    API endpoint to retrieve the authenticated user's profile.
    Requires authentication.
    """
    serializer_class = UserSerializers
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        """
        Handles GET requests to retrieve the authenticated user's profile.
        """
        serializer = UserSerializers(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)