# Generated by Django 2.0.4 on 2018-04-06 10:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20180406_0628'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='mobile',
            field=models.CharField(default=9999881223, max_length=10, validators=[django.core.validators.RegexValidator(message='Mobile no should be valid', regex='^\\[6789]\\d{9}$')]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='mode_of_payment',
            field=models.CharField(choices=[('PAYTM', 'PAYTM'), ('CASH', 'CASH'), ('MOBIKWIK', 'MOBIKWIK'), ('ONLINE_TRANSFER', 'ONLINE_TRANSFER')], default='PAYTM', max_length=255, verbose_name='mode pf payment'),
            preserve_default=False,
        ),
    ]
