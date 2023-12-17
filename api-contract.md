# API CONTRACT

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

## **GET /users**

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

## **GET /users/:id**

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
        **Content:** `{ error : "User doesn't exist" }`  

## **GET /users**/:id/friends

Returns friends of specified user.

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
        **Content:** `{ error : "User doesn't exist" }`  

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
        **Content:** `{ error : "User doesn't exist" }`  

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

Deletes the specified friend from specified user's friend list.

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


## GET /rooms/:id

