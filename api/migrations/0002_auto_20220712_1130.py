# Generated by Django 3.1.3 on 2022-07-12 02:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cat',
            name='color',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='cat',
            name='note',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
        migrations.AlterField(
            model_name='cat',
            name='pattern',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('adopter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='adopter', to=settings.AUTH_USER_MODEL)),
                ('cat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.cat')),
                ('supporter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='supporter', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
