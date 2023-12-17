# API Contract

#### Table of Contents
- [Rest API HTTP Endpoints](#rest-api-http-endpoints)
	- [Users](#users) 
		- [GET /users](#get-users)
		- [GET /users/:id](#get-usersid)
		- [GET /users/:id/friends](#get-usersidfriends)
		- [POST /users](#post-users)
		- [POST /users/:id/friends](#post-usersidfriends)
		- [POST /login](#post-login)
		- [POST /register](#register)
		- [PATCH /users/:id](#patch-usersid)
		- [DELETE /users/:id](#delete-usersid)
		- [DELETE /users/:id/friends/:friendId](#delete-usersidfriendsfriendId)
	- [Rooms](#rooms)
		- [GET /rooms](#get-rooms)
		- [GET /rooms/:id](#get-roomsid")
		- [POST /rooms](#post-rooms)
		- [PATCH /rooms/:id](#patch-roomsid)
		- [DELETE /rooms/:id](#delete-roomsid)
- [Web Socket endpoints](#web-socket-endpoints)
	- [/ws/dashboard](#wsdashboard)
	- [/ws/room](#wsroom)
	- [/ws/game](#wsgame)
# Rest API HTTP Endpoints
This section outlines the paths to HTTP endpoints and their expected data shapes, behaviour, parameters and responses.
## Users

* User object:
``` 
{
  id: int
  username: string
  avatar: url_string
  status: "online" | "offline"
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## GET /users

Returns all users.

- **URL Params**
    None
- **Data Params**  
	None
- **Headers**  
    Content-Type: application/json
- **Success Response:**
	- **Code:** 200  
		* ***Content:**
```
{
  users: [
           {<user_object>},
           {<user_object>},
           {<user_object>}
         ]
}
```

## GET /users/:id

Returns the specified user.

- **URL Params**  
    _Required:_ `id=[integer]`
- **Data Params**  
    None
- **Headers**  
    Content-Type: application/json  
- **Success Response:**
	- **Code:** 200  
		- **Content:** `{ <user_object> }`
- **Error Response:**
	- **Code:** 404  
		- **Content:** `{ error : "User doesn't exist" }`  

## **GET /users**/:id/friends

Returns all friends of specified user.

- **URL Params**  
    _Required:_ `id=[integer]`
- **Data Params**  
    None
- **Headers**  
    Content-Type: application/json  
- **Success Response:**
	- **Code:** 200  
		- **Content:** 
```
{
  friends: [
           {<user_object>},
           {<user_object>},
           {<user_object>}
         ]
}
```
- **Error Response:**
	- **Code:** 404  
		- **Content:** `{ error : "User doesn't exist" }`  

## **POST /users**

Creates a new User and returns the new object.

- **URL Params**  
    None
- **Headers**  
    Content-Type: application/json
- **Data Params**

```
  {
    <user_object>
  }
```

- **Success Response:**
	- **Code:** 200  
		- **Content:** `{ <user_object> }`
- **Error Response:**
    - **Code:** 404  
	    - **Content:** `{ error : "User doesn't exist" }`  

## **POST /users/:id/friends**

Adds a friend to user's friend list and returns the friend's user object.

- **URL Params**  
    _Required:_ `id=[integer]`
- **Headers**  
    Content-Type: application/json
- **Data Params**

```
  {
    <user_object>
  }
```

- **Success Response:**
	- **Code:** 200  
		- **Content:** `{ <user_object> }`

## **POST /login**

Logs in a User and returns the user object.

- **URL Params**  
    None
- **Headers**  
    Content-Type: application/json
- **Data Params**

```
  {
    username: string
    password: string
  }
```

- **Success Response:**
	- **Code:** 200  
		- **Content:** `{ <user_object> }`
- **Error Response:**
	- **Code:** 401  
		- **Content:** `{ error : "Invalid user or password" }`  

## **POST /register**

Logs in a User and returns the user object.

- **URL Params**  
    None
- **Headers**  
    Content-Type: application/json
- **Data Params**

```
  {
    username: string
    password: string
  }
```

- **Success Response:**
	- **Code:** 201  
	- **Content:** `{ <user_object> }`
- **Error Response:**
	- **Code:** 409  
		- **Content:** `{ error : "Username already exists" }`  
	- **Code:** 422  
		- **Content:** `{ error : "Password doesn't meet requirements" }`  



## **PATCH /users/:id**

Updates fields on the specified user and returns the updated object.

- **URL Params**  
    _Required:_ `id=[integer]`
- **Data Params**
	one or more user fields, for example:
```
  {
  	username: string
  	avatar: url_string
  }
```

- **Headers**  
    Content-Type: application/json  
- **Success Response:**
	- **Code:** 200  
		- **Content:** `{ <user_object> }`
- **Error Response:**
	- **Code:** 404  
		- ***Content:** `{ error : "User doesn't exist" }`  

## **DELETE /users/:id**

Deletes the specified user.

- **URL Params**  
    _Required:_ `id=[integer]`
- **Data Params**  
    None
- **Headers**  
    Content-Type: application/json  
- **Success Response:**
	- **Code:** 204
- **Error Response:**
	- **Code:** 404  
		- **Content:** `{ error : "User doesn't exist" }`  

## DELETE /users/:id/friends/:friendId

Deletes the specified friend from the specified user's friend list.

- **URL Params**  
    _Required:_ `id=[integer], friendId=[integer]`
- **Data Params**  
    None
- **Headers**  
    Content-Type: application/json  
- **Success Response:**
	- **Code:** 204
- **Error Response:**
	- **Code:** 404  
		- **Content:** `{ error : "User doesn't exist" }`  

## Rooms

* Room object:
``` 
{
  id: int
  roomName: string
  users: <user_objects>[]
  game: "classic-pong" | "meta-pong"
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## GET /rooms

Returns all rooms.

- **URL Params**
    None
- **Data Params**  
	None
- **Headers**  
    Content-Type: application/json
- **Success Response:**
	- **Code:** 200  
		* ***Content:**
```
{
  rooms: [
           {<room_object>},
           {<room_object>},
           {<room_object>}
         ]
}
```


## GET /rooms/:id

Returns the specified room.

- **URL Params**  
    _Required:_ `id=[integer]`
- **Data Params**  
    None
- **Headers**  
    Content-Type: application/json  
- **Success Response:**
	- **Code:** 200  
		- **Content:** `{ <room_object> }`
- **Error Response:**
	- **Code:** 404  
		- **Content:** `{ error : "Room doesn't exist" }`  

## **POST /rooms**

Creates a new Room and returns the new object.

- **URL Params**  
    None
- **Headers**  
    Content-Type: application/json
- **Data Params**

```
  {
    <room_object>
  }
```

- **Success Response:**
	- **Code:** 200  
		- **Content:** `{ <room_object> }`
- **Error Response:**
	- **Code:** 404  
		- **Content:** `{ error : "Room doesn't exist" }`  

## PATCH /rooms/:id

Makes field changes to specified room and returns updated object. For example, it can be used to add and remove users from a room.

- **URL Params**  
    _Required:_ `id=[integer]`
- **Data Params**
	one or more user fields, for example:
```
  {
  	users: [
	  	<user_object>
	  	<user_object>
	  	<user_object>
	  	...
	  	]
  }
```

- **Headers**  
    Content-Type: application/json  
- **Success Response:**
	- **Code:** 200  
		- **Content:** `{ <room_object> }`
- **Error Response:**
	- **Code:** 404  
		- ***Content:** `{ error : "Room doesn't exist" }`  

## DELETE /rooms/:id

Deletes the specified room.

- **URL Params**  
    _Required:_ `id=[integer]`
- **Data Params**  
    None
- **Headers**  
    Content-Type: application/json  
- **Success Response:**
	- **Code:** 204
- **Error Response:**
	- **Code:** 404  
		- **Content:** `{ error : "Room doesn't exist" }`  


# Web Socket Endpoints

This section outlines the paths to Web Socket endpoints and their expected data shapes, behaviour, parameters and responses.

## /ws/dashboard

Gives back real time general dashboard data such as numbers of users logged in, open rooms, friends online, etc.

## /ws/room

Gives back `<room_object>` each time it changes.

## /ws/game

(Could be integrated into /ws/room-state?)
Gives back `<game_object>`(or `<room_object>`?) each time it changes.