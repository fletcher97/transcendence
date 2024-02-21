# API Contract

#### Table of Contents

- [Rest API HTTP Endpoints](#rest-api-http-endpoints)
  - [Users](#users)
    - [GET /users](#get-users)
    - [GET /users/:id](#get-usersid)
    - [GET /users/:id/friends](#get-usersidfriends)
    - [POST /users](#post-users)
    - [POST /login](#post-login)
    - [POST /register](#post-register)
    - [POST /logout/:id](#post-logoutid)
    - [PATCH /users/:id](#patch-usersid)
    - [DELETE /users/:id](#delete-usersid)
    - [DELETE /users/:id/friends/:friendId](#delete-usersidfriendsfriendId)
  - [Friend Requests](#friend-requests)
    - [GET /users/friend_requests](#get-usersfriend_requests)
    - [POST /users/friend_requests](#post-usersfriend_requests)
- [Web Socket endpoints](#web-socket-endpoints)
  - [Rooms](#rooms)

# Rest API HTTP Endpoints

This section outlines the paths to HTTP endpoints and their expected data shapes, behaviour, parameters and responses.

## Users

- User object:

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

### GET /users

Returns all users.

- **URL Params**
  None
- **Data Params**  
  None
- **Headers**  
   Content-Type: application/json
- **Success Response:**
  - **Code:** 200
    - **\*Content:**

```
{
  users: [
           {<user_object>},
           {<user_object>},
           {<user_object>}
         ]
}
```

### GET /users/:id

Returns the specified user.

- **URL Params**  
   *Required:* `id=[integer]`
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

### **GET /users**/:id/friends

Returns all friends of specified user.

- **URL Params**  
   *Required:* `id=[integer]`
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

### **POST /users**

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

### **POST /users/:id/friends**

Adds a friend to user's friend list and returns the friend's user object.

- **URL Params**  
   *Required:* `id=[integer]`
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

### **POST /login**

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

### **POST /register**

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

### **POST /logout/:id**

Logs out specified user.

- **URL Params**  
   *Required:* `id=[integer]`
- **Headers**  
   Content-Type: application/json
- **Data Params**
  None
- **Success Response:**
  - **Code:** 204
- **Error Response:**
  - **Code:** 404
    - **Content:** `{ error : "User doesn't exist" }`

### **PATCH /users/:id**

Updates fields on the specified user and returns the updated object.

- **URL Params**  
   *Required:* `id=[integer]`
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
    - **\*Content:** `{ error : "User doesn't exist" }`

### **DELETE /users/:id**

Deletes the specified user.

- **URL Params**  
   *Required:* `id=[integer]`
- **Data Params**  
   None
- **Headers**  
   Content-Type: application/json
- **Success Response:**
  - **Code:** 204
- **Error Response:**
  - **Code:** 404
    - **Content:** `{ error : "User doesn't exist" }`

## Friends

- Friend object:

```
{
  id: int
  user1: user_object
  user2: user_object
  createdAt: timestamp
}
```

### **GET /users/friends**

Get all friend requests issued to authenticated user

- **Headers**  
   Content-Type: application/json

- **Success Response:**

  - **Code:** 200
    - **Content:**
    ```
      [
        <friend__object>,
        <friend__object>,
        ...
      ]
    ```

### **POST /users/friends**

Create friend

- **Headers**  
   Content-Type: application/json

- **Success Response:**

  - **Code:** 200
    - **Content:**
      `<friend__object>,`

### **DELETE /users/friends/:friendId**

Deletes the specified friend from the authorised user's friend list.

- **URL Params**  
   *Required:* `friendId=[integer]`
- **Data Params**  
   None
- **Headers**  
   Content-Type: application/json
- **Success Response:**
  - **Code:** 204
- **Error Response:**
  - **Code:** 404
    - **Content:** `{ error : "User doesn't exist" }`

## Friend Requests

```
{
  id: int
  user: user_object
}
```

### **GET /users/friend_requests**

Get all friend requests issued to authenticated user

- **Headers**  
   Content-Type: application/json

- **Success Response:**

  - **Code:** 200
    - **Content:**
    ```
      [
        <friend_request_object>,
        <friend_request_object>,
        ...
      ]
    ```

### **POST /users/friend_requests**

Sends a friend request to user(username) specified in body

- **Headers**  
   Content-Type: application/json

- **Data Params**

```
  {
    <username>
  }
```

- **Success Response:**
  - **Code:** 200
    - **Content:** `{ <friend_request_object> }`

### **DELETE /users/friend_requests/:friendRequestId**

Removes the specified friend request from the authorised user's friend requests.

- **URL Params**  
   *Required:* `friendRequestId=[integer]`
- **Data Params**  
   None
- **Headers**  
   Content-Type: application/json
- **Success Response:**
  - **Code:** 204

## Rooms

- Room object:

```
{
	name: string
	spectators: int
	players: {
		p1: None | {
			position: int
			points: int
			paddle_height: int
		}
		p2: None | {
			position: int
			points: int
			paddle_height: int
		}
	}
	state: "waiting" | "ready" | "playing"
	timer: float
}
```

- **name**: This is the name of the room

- **spectators**: This is the amount of spectators currently watching the game.

- **players**: the `players` field contains 2 entries. One for each player. It will have the information about a player if they are present.
  Otherwise none will be present.

- **state**: When a room is created it will be in `waiting` state. Once all player spots have been filled it will change to `ready`. Finally,
  when the game starts, it will change to `playing`.

- **timer**: the timer server to represent how long a play has been on. Before the game starts it will have a negative value signifying how long it will be until the game starts. Once the game starts it will count how long the game has been on for.

### GET /pong/rooms

A list with [rooms](#rooms) will returned

# Web Socket endpoints

All game communication is done through websockets. They allow for a live connection to keep streaming data both ways and thus
play the game. From the moment a player enters a room a websocket is created to handle all communication.

Rooms are where player play the games. Players can join a room by creating a websocket and specifying the room they wish to connect to.
The endpoint would be `/ws/pong/<room_name>`. If the room exists, the player will join it. If it doesn't one will be created.

During the game, the room state will be constantly shared with all connected clients. All communication from spectators will be ignored. The
players however can send movement instructions. For that a json with the following format should be sent through the websoket:

```
{
	"move": int
}
```

- **move**: Move must be either `1` or `-1` that represent respectively up and down.
