from Message.models import Message, Conversation, Notification
from rest_framework import serializers
from User.serializers import UserSerializers
from User.models import User



class ConversationSerializer(serializers.ModelSerializer):
    number_of_messages = serializers.SerializerMethodField()
    participants = UserSerializers(many=True)
    # Writable version (for patch/post)
    participant_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Conversation
        fields = '__all__'

    def get_number_of_messages(self, obj):
        messages = Message.objects.filter(
            conversation_id=obj.id
        )
        return f'{len(list(messages))}'


    def update(self, instance, validated_data):
        participants = validated_data.pop('participant_ids', None)
        if participants is not None:
            instance.participants.add(*participants)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        participants = validated_data.pop('participant_ids', [])
        conversation = Conversation.objects.create(**validated_data)
        if participants:
            conversation.participants.set(participants)
        return conversation


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    
    class Meta:
        model = Message
        fields = '__all__'



    def get_sender(self, obj):
        return {
            "id": obj.sender.id,
            "first_name": obj.sender.first_name,
            "last_name": obj.sender.last_name,
            "email": obj.sender.email,
        }
    
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'