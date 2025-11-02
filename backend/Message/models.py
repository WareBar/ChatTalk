from django.db import models
from User.models import User
from django.utils import timezone

# Create your models here.
class Conversation(models.Model):
    class ConversationType(models.TextChoices):
        GROUP = 'group'
        PRIVATE = 'private'
    
    reference_code = models.CharField(max_length=20, unique=True, editable=False, default='tttt02000')
    participants = models.ManyToManyField(User, related_name='conversations')
    conversation_type = models.CharField(
        max_length=20,
        choices=ConversationType.choices,
        default=ConversationType.PRIVATE)
    
    name = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Optional to group type conversation"
    )

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.id}'
    
    def save(self, *args, **kwargs):
        if not self.pk: #creating
            super().save(*args, **kwargs)
            self.reference_code = f'CONVO-{timezone.now().year}-{str(self.pk).zfill(6)}'
            return super().save(update_fields=['reference_code'])
        
        return super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']



class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name='messages'
    )



    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(null=False)
    sent_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.sender.first_name} {self.content[:30]}'
    


class Notification(models.Model):
    to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.to.first_name} {self.content[:10]}'
    


