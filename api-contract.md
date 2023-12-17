
#### overview
- User

## Users

- User object:
``` 
{
  id: int
  username: string
  avatar: url_string
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## **GET /users**

Returns all users in the system.

- **URL Params**
    None
- **Data Params**  
	None
- **Headers**  
    Content-Type: application/json
- **Success Response:**
	- **Code:** 200  
	- **Content:**
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
        OR
    - **Code:** 401  
        **Content:** `{ error : error : "You are unauthorized to make this request." }`

## **GET /users/:id/friends**



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

## GET /rooms:id



* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
* **Code:** 200  
  **Content:**  `{ <user_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "User doesn't exist" }`  
  OR  
  * **Code:** 401  
  **Content:** `{ error : error : "You are unauthorized to make this request." }`