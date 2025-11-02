from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Message.views import (
    ConversationViewSet,
    MessageViewSet,
    NotificationViewSet
)

router = DefaultRouter()
router.register('conversation',ConversationViewSet, basename='conversation')
router.register('message',MessageViewSet, basename='message')
router.register('notification',NotificationViewSet, basename='notification')

urlpatterns = [
    path('',include(router.urls)),
]
