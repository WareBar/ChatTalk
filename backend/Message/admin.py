from django.contrib import admin
from Message.models import Conversation, Message, Notification
# Register your models here.


admin.site.register(Conversation)
admin.site.register(Message)
admin.site.register(Notification)