import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.utils import timezone

from Message.models import Message, Conversation

User = get_user_model()

# FLOW
"""
connects to websocket
listen to the connection
frontend sends a message with type "message.send"
consumer handles the message
checks the type
checks the content
save the message to the database for persistence
create payload dictionary containing message from the frontend
broadcast it to all channels connected to that group
"""
class MessageConsumer(AsyncJsonWebsocketConsumer):
    """
    WebSocket consumer for a conversation.
    Protocol (client <-> server):
    - Client sends: {"type": "message.send", "content": "Hello"}
    - Server broadcasts message objects: {"type": "message", "id":..., "sender": {...}, "content": "...", "sent_at": "..."}
    """

    async def connect(self):
        # connects to a conversation using reference code from the request
        # scope is treated the same as request in views functions
        
        self.reference_code = self.scope['url_route']['kwargs']['reference_code']
        self.group_name = f'conversations_{self.reference_code}'
        print('Conntected')

        # Authenticate user on connect
        user = await self.get_user_from_scope()
        if user is None or not user.is_active:
            await self.close(code=4001)
            return
        
        self.user = user
        print(self.user)

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    # Handles messages receive from the connected client,
    # Receives the messages and save to the database
    # Then send that save instance to the clients group
    async def receive_json(self, content, **kwargs):
        try:
            msg_type = content.get('type')
            if msg_type == 'message.send':
                text = content.get('content', "").strip()
                if not text:
                    return
                

                message = await self.create_message(self.reference_code, self.user, text)
                print("SAVING MESSAGE", message)

                payload = {
                    "type": "message.broadcast",
                    "id": message.id,
                    "sender": {
                        "id": self.user.id,
                        "first_name": self.user.first_name,
                        "last_name": self.user.last_name,
                        "email": self.user.email,
                    },
                    "content": message.content,
                    "sent_at": message.sent_at.isoformat(),
                    "conversation": self.reference_code,
                }
                # after saving the message into the database, we broadcast the same information to the group then send to the groups layer

                await self.channel_layer.group_send(self.group_name, payload)
        except Exception as e:
            import traceback
            traceback.print_exc()
            await self.send_json({"error": str(e)})

    # handles events sent to the group
    # Receives broadcast events and forwards them to each socket
    # Handler called by group_send with the type "message.broadcast"
    async def message_broadcast(self, event):
        # forward to websocket clients
        await self.send_json(
            {
                "type": "message",
                "id": event["id"],
                "sender": event["sender"],
                "content": event["content"],
                "sent_at": event["sent_at"],
                "conversation": event["conversation"],
            }
        )


    # DB helpers
    @database_sync_to_async
    def create_message(self, reference_code, user, text):
        conv = Conversation.objects.get(reference_code=reference_code)
        msg = Message.objects.create(conversation=conv, sender=user, content=text, sent_at=timezone.now())
        return msg
    


    @database_sync_to_async
    def get_user_from_scope(self):
        """
        Default: attempt to use scope["user"] (AuthMiddlewareStack) which supports session auth.
        Additionally: support token via querystring ?token=JWT... (common pattern)
        Modify this for your auth (SimpleJWT, DRF token, etc).
        """
        # If already authenticated via session:
        if getattr(self.scope, "user", None) and self.scope["user"].is_authenticated:
            return self.scope["user"]

        # Fallback: try token in query string
        query_string = self.scope.get("query_string", b"").decode()
        # parse token param
        import urllib.parse
        qs = urllib.parse.parse_qs(query_string)
        token_list = qs.get("token") or qs.get("access_token")
        if not token_list:
            return None
        token = token_list[0]

        # Example for SimpleJWT:
        try:
            from rest_framework_simplejwt.authentication import JWTAuthentication
            jwt_auth = JWTAuthentication()
            validated_token = jwt_auth.get_validated_token(token)
            user = jwt_auth.get_user(validated_token)
            return user
        except Exception:
            # If you use a different token system, replace above with the right logic
            return None
        
# This consumer only broadcast
class NotificationConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        # connects to the client instance
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.group_name = f'notification_for_{self.user_id}'

        user = await self.get_user_from_scope()
        if user is None or not user.is_active:
            await self.close(code=4001)
            return
        self.user = user

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)


    # handler called by group_send with type "notification.new"
    # this sends information to the client's browser
    async def notification_new(self, event):
        # event contains the payload
        print('NEW NOTIFICATION ON')
        await self.send_json({
            'type':'notification',
            "title":event.get('title'),
            "message":event.get('message'),
            'conversation_name':event.get('conversation_name')
        })
    
    @database_sync_to_async
    def get_user_from_scope(self):
        """
        Default: attempt to use scope["user"] (AuthMiddlewareStack) which supports session auth.
        Additionally: support token via querystring ?token=JWT... (common pattern)
        Modify this for your auth (SimpleJWT, DRF token, etc).
        """
        # If already authenticated via session:
        if getattr(self.scope, "user", None) and self.scope["user"].is_authenticated:
            return self.scope["user"]

        # Fallback: try token in query string
        query_string = self.scope.get("query_string", b"").decode()
        # parse token param
        import urllib.parse
        qs = urllib.parse.parse_qs(query_string)
        token_list = qs.get("token") or qs.get("access_token")
        if not token_list:
            return None
        token = token_list[0]

        # Example for SimpleJWT:
        try:
            from rest_framework_simplejwt.authentication import JWTAuthentication
            jwt_auth = JWTAuthentication()
            validated_token = jwt_auth.get_validated_token(token)
            user = jwt_auth.get_user(validated_token)
            return user
        except Exception:
            # If you use a different token system, replace above with the right logic
            return None
        




# *.send used for incoming client actions
# *.broadcast used for outgoing group events

# they are used in type



# type: message.send - indicates that we sent or post request
# type: message.broadcast - indicates that we wish to announce something to all sockets


# Client sends {'type':"message.send","content":"Hello"}
# Consumer group_send payload: {"type":"message.broadcast","id":123,"content":"Hey", ...}
# Channels calls message_broadcast(event) on every connected consumer instance in that group
# Each consumer send_json({"type":"message", ...}) to its connected WebSocket, clients receive and update UI.




# Summary


# define consumer
# there are two function that is a requirement, connect and disconnect
# connect adds a channel to the group
# disconnects simply disconnect them

# after that
# there's called a handler, which is mapped when group_send() is called along with payload
# payload is a dicitionary containing the type and content, the type may contain something like "message.broadcast" 
# then it will map the consumer's handlers of method to find "message_broadcast"  which sends or anithing to the subscribed channels to the group


# the info that the handler sends, the frontend check its type and dislay the information