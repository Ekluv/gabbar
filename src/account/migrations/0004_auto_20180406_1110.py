# Generated by Django 2.0.4 on 2018-04-06 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_auto_20180406_1047'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='transaction_id',
            field=models.CharField(default=1212, max_length=255, verbose_name='transaction details'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='mode_of_payment',
            field=models.CharField(choices=[('PAYTM', 'PAYTM'), ('CASH', 'CASH'), ('MOBIKWIK', 'MOBIKWIK'), ('ONLINE_TRANSFER', 'ONLINE_TRANSFER')], max_length=255, verbose_name='mode of payment'),
        ),
    ]
