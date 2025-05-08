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
