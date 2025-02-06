# Generated by Django 4.1.9 on 2023-06-20 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backoffice', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='talkentry',
            name='speaker',
        ),
        migrations.RemoveField(
            model_name='talkentry',
            name='speaker_short_desc',
        ),
        migrations.AddField(
            model_name='talkentry',
            name='speakers',
            field=models.TextField(blank=True, help_text='Speakers of the talk and short description', null=True),
        ),
    ]
