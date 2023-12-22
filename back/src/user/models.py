from django.db import models

# Create your models here.

class Users(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birth_date = models.DateField()
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    created_date_time = models.DateField()

    def __str__(self):
        return (f"{self.username}")
