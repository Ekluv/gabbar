from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser
from django.utils.crypto import get_random_string
from djutil.models import TimeStampedModel

from account.manager import UserManager

# Create your models here.

phone_regex = RegexValidator(regex=r'^[6789]\d{9}$', message='Mobile no should be valid', code='invalid_mobile')

class User(AbstractBaseUser, TimeStampedModel):
    CASH = "CASH"
    PAYTM = 'PAYTM'
    MOBIKWIK = 'MOBIKWIK'
    ONLINE_TRANSFER = 'ONLINE_TRANSFER'

    MALE = 'MALE'
    FEMALE = 'FEMALE'

    DIRECTOR = 'DIRECTOR'
    ACTOR = 'ACTOR'
    PRODUCER = 'PRODUCER'
    CAMERA_MAN = 'CAMERA_MAN'
    SCREENPLAY_WRITER = 'SCREENPLAY_WRITER'
    ASST_DIRECTOR = 'ASST_DIRECTOR'

    MODE_OF_PAYMENT = (
        (PAYTM, 'PAYTM'),
        (CASH, 'CASH'),
        (MOBIKWIK, 'MOBIKWIK'),
        (ONLINE_TRANSFER, 'ONLINE_TRANSFER'),
    )

    GENDER_CHOICES = (
        (MALE, 'MALE'),
        (FEMALE, 'FEMALE')
    )

    PROFESSION = (
        (DIRECTOR, 'DIRECTOR'),
        (ACTOR, 'ACTOR'),
        (PRODUCER, 'PRODUCER'),
        (CAMERA_MAN, 'CAMERA_MAN'),
        (SCREENPLAY_WRITER, 'SCREENPLAY_WRITER'),
        (ASST_DIRECTOR, 'ASST_DIRECTOR')
    )

    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    mobile = models.CharField(validators=[phone_regex], max_length=10, unique=True)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=255)
    mode_of_payment = models.CharField('mode of payment', choices=MODE_OF_PAYMENT, max_length=255)
    transaction_id = models.CharField('transaction details', max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False) # a admin user; non super-user
    is_admin = models.BooleanField(default=False) # a superuser
    referral_code = models.CharField(max_length=25)
    referred_by = models.ForeignKey('self', null=True, on_delete=models.SET_NULL)
    profession = models.CharField(choices=PROFESSION, max_length=255)
    # notice the absence of a "Password field", that's built in.

    USERNAME_FIELD = 'email'
    objects = UserManager()

    def __str__(self):              # __unicode__ on Python 2
        return self.email

    @property
    def full_name(self):
        return self.first_name + ' ' + self.last_name 

    def has_perm(self, perm, obj=None):
        """
        Does the user have a specific permission?
        """
        return True

    def has_module_perms(self, app_label):
        """
        Does the user have permissions to view the app `app_label`?
        """
        return True

    def save(self, *args, **kwargs):
        if not self.referral_code:
            self.referral_code = get_random_string(8)
        # TODO: remove later
        if not self.mode_of_payment:
            self.mode_of_payment = User.CASH
        if not self.transaction_id:
            self.transaction_id = get_random_string()
        super(User, self).save(*args, **kwargs)
