# Generated by Django 3.1.3 on 2022-06-14 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cat',
            name='age',
            field=models.DecimalField(decimal_places=1, max_digits=2),
        ),
    ]