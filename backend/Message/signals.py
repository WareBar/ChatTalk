from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from Message.models import Message,Notification,Conversation
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync




@receiver(post_save, sender=Message)
def send_new_message_notification(sender, instance, created,**kwargs):
    """
    when a new message is sent to a conversation
    """
    if not created:
        return
    
    channel_layer = get_channel_layer()

    # Notify the participants of the conversation excluding the sender
    conversation = instance.conversation
    sender_user = instance.sender
    participants = conversation.participants.exclude(id=sender_user.id)
    print(f'''
    
    
    SENDER: {sender_user}
    CONVO_NAME: {conversation.name}
    CONVO PARTICIAPNTS: {participants}
    

''')
    print(conversation.participants.all())


    for user in participants:
        group_name = f'notification_for_{user.id}'
        payload = {
            "type":"notification.new", #this will trigger the notifcation_new handler
            "title":"New Message",
            "message": f"{sender_user.first_name} sent a message: {instance.content}",
            "conversation_name": f'{conversation.name}'
        }
        print(conversation.name)
        # save the notification in the databse
        Notification.objects.create(
            to=user,
            content=f'New message on {instance.conversation.name}'
        )


        async_to_sync(channel_layer.group_send)(group_name, payload)


@receiver(m2m_changed, sender=Conversation.participants.through)
def user_join_notification(sender, instance, action, pk_set, **kwargs):
    """
    When someone new joined the room
    """
    
    if action != "post_add":  # Only trigger after new users are added
        return
    

    print('SOMEONE NEW JOINED THE CONVERSATION')
    channel_layer = get_channel_layer()

    # contains the ids of newly joined users
    newly_joined_users = pk_set

    recipients = instance.participants.exclude(id__in=newly_joined_users)

    # broadcast and save notification
    for user in recipients:
        group_name = f'notification_for_{user.id}'
        payload = {
            "type":"notification.new", #this will trigger the notifcation_new handler
            "title":f"New participants joined '{instance.name or instance.reference_code}'",
            "message":"New member joined the room chat"
        }

        Notification.objects.create(
            to=user,
            content=f"New participant(s) joined '{instance.name or instance.reference_code}'."
        )
        async_to_sync(channel_layer.group_send)(group_name, payload)
