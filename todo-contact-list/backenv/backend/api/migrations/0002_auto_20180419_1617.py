# Generated by Django 2.0.4 on 2018-04-19 16:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contact',
            old_name='avatar_url',
            new_name='avatar',
        ),
    ]
