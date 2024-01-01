from django.http import JsonResponse

from . import rooms

# Create your views here.


def get_rooms(_):
    return JsonResponse(rooms.Rooms.get_rooms(), safe=False)
