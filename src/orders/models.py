from django.db import models
from django.conf import settings
from djutil.models import TimeStampedModel


# Create your models here.

class Order(TimeStampedModel):
    COMPLETED = 'COMPLETED'
    PENDING = 'PENDING'
    REJECTED = 'REJECTED'
    STATES = (
        (COMPLETED, 'Completed'),
        (PENDING, 'Pending'),
        (REJECTED, 'Rejected'),
    )

    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField('status', max_length=30, choices=STATES, default=PENDING)
    amount = models.IntegerField()
