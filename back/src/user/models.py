from django.db import models

# Create your models here.

class Users(models.Model):
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=64)

    def __str__(self):
        return (f"{self.username}")
