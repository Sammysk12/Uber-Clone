# API Documentation

## Endpoint: `/api/users/register`

### Description

This endpoint is used to register a new user in the system.

### Method

`POST`

### Request Body

The request body must be in JSON format and include the following fields:

| Field                | Type   | Required | Description                                    |
| -------------------- | ------ | -------- | ---------------------------------------------- |
| `fullName.firstName` | String | Yes      | The first name of the user (min 3 characters). |
| `fullName.lastName`  | String | No       | The last name of the user (min 3 characters).  |
| `email`              | String | Yes      | The email address of the user (must be valid). |
| `password`           | String | Yes      | The password for the user (min 6 characters).  |

### Example Request

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Response

#### Success (201 Created)

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "unique_user_id",
    "email": "johndoe@example.com"
  },
  "token " :"token_example"
}
```

#### Error (400 Bad Request)

```json
{
  "error": "All fields are required!"
}
```

#### Error (400 Bad Request)

```json
{
  "error": "User already exists!"
}
```

#### Error (422 Unprocessable Entity)

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Notes

- Ensure that the `email` field is unique.
- Passwords are hashed before being stored in the database.
- The `lastName` field is optional but must meet the minimum length requirement if provided.




## Endpoint: `/api/users/login`

### Description

This endpoint is used to authenticate a user and provide a token for accessing protected resources.

### Method

`POST`

### Request Body

The request body must be in JSON format and include the following fields:

| Field    | Type   | Required | Description                                    |
| -------- | ------ | -------- | ---------------------------------------------- |
| `email`  | String | Yes      | The email address of the user (must be valid). |
| `password` | String | Yes      | The password for the user (min 6 characters).  |

### Example Request

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Response

#### Success (200 OK)

```json
{
  "message": "Login successful",
  "user": {
    "id": "unique_user_id",
    "email": "johndoe@example.com"
  },
  "token": "token_example"
}
```

#### Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Error (401 Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

### Notes

- Ensure the `email` exists in the database.
- Passwords are compared securely using a hashing algorithm.
- A valid token is returned upon successful authentication, which can be used for accessing protected routes.



## Endpoint: `/api/users/profile`

### Description

This endpoint is used to retrieve the profile of the currently authenticated user.

### Method

`GET`

### Headers

| Header           | Type   | Required | Description                     |
| ----------------- | ------ | -------- | ------------------------------- |
| `Authorization`  | String | Yes      | Bearer token for authentication |

### Response

#### Success (200 OK)

```json
{
  "user": {
    "id": "unique_user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

#### Error (401 Unauthorized)

```json
{
  "message": "Unauthorized!"
}
```

### Notes

- This endpoint requires a valid token in the `Authorization` header.
- The token must not be blacklisted.

## Endpoint: `/api/users/logout`

### Description

This endpoint is used to log out the currently authenticated user by invalidating (blacklisting) their token.

### Method

`GET`

### Headers

| Header           | Type   | Required | Description                     |
| ----------------- | ------ | -------- | ------------------------------- |
| `Authorization`  | String | Yes      | Bearer token for authentication |

### Response

#### Success (200 OK)

```json
{
  "message": "Logged out successfully"
}
```

#### Error (401 Unauthorized)

```json
{
  "message": "Unauthorized!"
}
```

### Notes

- This endpoint requires a valid token in the `Authorization` header or cookie.
- The token is added to a blacklist to prevent further use.



## Endpoint: `/api/captains/register`

### Description

This endpoint is used to register a new captain in the system.

### Method

`POST`

### Request Body

The request body must be in JSON format and include the following fields:

| Field                | Type   | Required | Description                                    |
| -------------------- | ------ | -------- | ---------------------------------------------- |
| `fullName.firstName` | String | Yes      | The first name of the captain (min 3 characters). |
| `fullName.lastName`  | String | No       | The last name of the captain (min 3 characters).  |
| `email`              | String | Yes      | The email address of the captain (must be valid). |
| `password`           | String | Yes      | The password for the captain (min 6 characters).  |
| `vehicle.color`      | String | Yes      | The color of the captain's vehicle (min 3 characters). |
| `vehicle.plate`      | String | Yes      | The license plate of the captain's vehicle (min 3 characters). |
| `vehicle.capacity`   | Number | Yes      | The capacity of the captain's vehicle (min 1). |
| `vehicle.vehicleType`| String | Yes      | The type of the captain's vehicle (must be one of `car`, `bike`, or `auto`). |

### Example Request

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "janedoe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response

#### Success (201 Created)

```json
{
  "message": "Captain registered successfully",
  "captain": {
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "janedoe@example.com",
    "password": "janepaswword@example12345",
    "status" : "inactive/active",
    "vehicle" : {
      "color": "White",
      "plate": "MH 01 AB 1234",
      "capacity" : 4,
      "vehicleType" : "car"
    },
    "id": "unique_captain_id",
  },
  "token": "token_example"
}
```

#### Error (400 Bad Request)

```json
{
  "error": "All fields are required!"
}
```

#### Error (400 Bad Request)

```json
{
  "error": "Captain already exists!"
}
```

#### Error (400 Bad Request)

```json
{
  "error": "This email registered to a user already!"
}
```

#### Error (422 Unprocessable Entity)

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be at least 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 3 characters long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

### Notes

- Ensure that the `email` field is unique and not already registered as a user.
- Passwords are hashed before being stored in the database.
- The `lastName` field is optional but must meet the minimum length requirement if provided.
- The `vehicleType` must be one of the allowed values: `car`, `bike`, or `auto`.

---