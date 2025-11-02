from rest_framework import viewsets
from Message.serializers import ConversationSerializer, MessageSerializer, NotificationSerializer
from Message.models import Conversation, Message, Notification
from django.core.exceptions import FieldError, ValidationError as DjangoValidationError # Import Django's ValidationErrors
from rest_framework.permissions import AllowAny

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = self.queryset
        request_params = self.request.query_params.dict()

        if not request_params:
            pass
        try:
            # conversations = Conversation.objects.filter(**request_params)

            # filter the params, exclude the name which will use particla icontains
            filter_params = {
                k: v for k, v in request_params.items()
                if k!= 'name'
            }
            queryset = queryset.filter(**filter_params)
            # handle partial name search
            name = request_params.get('name')
            if name:
                queryset = queryset.filter(
                    name__icontains=name
                )
        except FieldError:
            raise DjangoValidationError({'error':'Invalid filter. No such fields'})
        except DjangoValidationError as e:
            raise DjangoValidationError({"error":str(e)})
        
        return queryset.order_by('-created_at')


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        queryset = self.queryset
        request_params = self.request.query_params.dict()
        print(request_params)
        if not request_params:
            pass
        try:
            messages = Message.objects.filter(**request_params)
        except FieldError:
            raise DjangoValidationError({'error':'Invalid filter. No such fields'})
        except DjangoValidationError as e:
            raise DjangoValidationError({"error":str(e)})
        
        queryset = messages
        return queryset.order_by('-sent_at')


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


    def get_queryset(self):
        queryset = self.queryset
        request_params = self.request.query_params.dict()
        print(request_params)
        if not request_params:
            pass
        try:
            notifications = Notification.objects.filter(**request_params)
        except FieldError:
            raise DjangoValidationError({'error':'Invalid filter. No such fields'})
        except DjangoValidationError as e:
            raise DjangoValidationError({"error":str(e)})
        
        queryset = notifications
        return queryset.order_by('-created_at')