# Generated by Django 3.1.3 on 2022-07-20 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20220720_1432'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='is_first',
        ),
        migrations.AddField(
            model_name='chat',
            name='cat',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='chat_cat', to='api.cat'),
        ),
    ]
