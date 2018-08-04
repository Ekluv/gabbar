from django.db import models
from django.conf import settings
from djutil.models import TimeStampedModel

# from account.models import User

# # Create your models here.

class Wallet(TimeStampedModel):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        verbose_name='wallet user',
        on_delete=models.CASCADE
    )
    account = models.IntegerField(default=0)
