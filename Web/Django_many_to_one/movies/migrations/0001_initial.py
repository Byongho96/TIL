# Generated by Django 3.2.13 on 2022-10-07 00:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20)),
                ('audience', models.IntegerField()),
                ('release_date', models.DateField()),
                ('genre', models.CharField(max_length=30)),
                ('score', models.FloatField()),
                ('poster_url', models.TextField()),
                ('description', models.TextField()),
                ('accounts', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
