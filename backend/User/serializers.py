from User.models import User
from rest_framework import serializers


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username",'last_name','first_name','email','password']
        extra_kwargs = {"password": {"write_only": True}} #to prevent the password to be seen


    def create(self, validated_data):
    # return super().create(validated_data)
        user = User.objects.create_user(**validated_data) #override the create function
        return user