from django.urls import path
from . import views

urlpatterns = [
    path("get_rooms", views.get_rooms),
]
