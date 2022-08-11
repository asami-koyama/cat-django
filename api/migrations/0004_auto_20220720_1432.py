# Generated by Django 3.1.3 on 2022-07-20 05:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_chat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='receiver',
        ),
        migrations.RemoveField(
            model_name='chat',
            name='sender',
        ),
        migrations.AddField(
            model_name='chat',
            name='adopter',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='chat_adopter', to='api.user'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='chat',
            name='is_first',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='chat',
            name='supporter',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, related_name='chat_supporter', to='api.user'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='offer',
            name='adopter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='offer_adopter', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='offer',
            name='supporter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='offer_supporter', to=settings.AUTH_USER_MODEL),
        ),
    ]
