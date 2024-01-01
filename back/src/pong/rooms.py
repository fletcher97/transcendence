class Rooms(JsonWebsocketConsumer):
    rooms = {}

    ########################
    # General room methods #
    ########################

    @classmethod
    def get_room_data(cls, room_name: str, room: dict) -> dict:
        return {
            "name": room_name,
            "spectators": room["spectators"],
            "players": {
                "p1": room["game"].p1_data(),
                "p2": room["game"].p2_data(),
            },
            "status": room["game"].get_state(),
        }

    @classmethod
    def get_rooms(cls) -> list:
        room_list = []
        for name, room in cls.rooms.items():
            room_list.append(cls.get_room_data(name, room))
        return room_list

