from django.urls import re_path
from Message.consumers import MessageConsumer, NotificationConsumer

websocket_urlpatterns = [
    re_path(r"^ws/conversations/(?P<reference_code>[\w\-]+)/?$", MessageConsumer.as_asgi()),
    re_path(r"^ws/notifications/(?P<user_id>[\w\-]+)/?$", NotificationConsumer.as_asgi()),
]




