from cgitb import text
from django.db import models
from django.conf import settings

# Create your models here.
class Movie(models.Model):
    accounts = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    audience = models.IntegerField()
    release_date = models.DateField()
    genre = models.CharField(max_length=30)
    score = models.FloatField()
    poster_url = models.TextField()
    description = models.TextField()
    recommendation = models.CharField(max_length=200)  # 임의 추가

class Comment(models.Model):
    accounts = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movies = models.ForeignKey(Movie, on_delete=models.CASCADE)
    content = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)