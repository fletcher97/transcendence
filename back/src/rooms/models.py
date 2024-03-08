from django.db import models
from user.models import Users
from django.utils import timezone

# Create your models here.

class   Room(models.Model):
    name = models.CharField(max_length=64)
    player1 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='player1')
    player2 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='player2', null=True, blank=True)
    is_active = models.BooleanField(default=False)  # Indicates if the game is currently active
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class   GameHistory(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE) 
    score_player1 = models.IntegerField()
    score_player2 = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)