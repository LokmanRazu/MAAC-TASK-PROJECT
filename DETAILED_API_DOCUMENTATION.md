# API Documentation

This document provides detailed information about the API endpoints.

## Authentication

This API uses JWT for authentication. To access protected endpoints, you need to include an `Authorization` header with the value `Bearer <your_jwt_token>`.

---

## Auth Module

### `POST /auth/signup`

Registers a new user.

**Service Method:** `authService.signup()`

**Request Body:** `UserRequestDto`

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "user" or "admin"
}
```

**Response:** `string`

```
"Sign UP Sucessfully"
```

### `POST /auth/signin`

Logs in a user.

**Service Method:** `authService.login()`

**Request Body:** `LoginRequestDto`

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** `LoginResponseDto`

```json
{
  "accessToken": "string"
}
```

---

## User Module

### `GET /users/me`

Retrieves the profile of the currently logged-in user.

**Authentication:** Required (JWT)

**Service Method:** `userService.findOne()`

**Response:** `UserResponseDto`

```json
{
  "id": "string",
  "name": "string",
  "email": "string"
}
```

### `PUT /users/update-profile`

Updates the profile of the currently logged-in user.

**Authentication:** Required (JWT)

**Service Method:** `userService.update()`

**Request Body:** `UserUpdateRequestDto`

```json
{
  "name": "string"
}
```

**Response:** `UserResponseDto`

```json
{
  "id": "string",
  "name": "string",
  "email": "string"
}
```

---

## Blog Module

### `GET /blogs`

Retrieves all blogs created by the currently logged-in user.

**Authentication:** Required (JWT)

**Service Method:** `blogService.findAll()`

**Response:** `BlogResponseDto[]`

```json
[
  {
    "id": "string",
    "title": "string",
    "body": "string",
    "userId": "string",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "tags": [
      {
        "id": "string",
        "name": "string"
      }
    ]
  }
]
```

### `GET /blogs/:id`

Retrieves a specific blog by its ID.

**Authentication:** Required (JWT)

**Service Method:** `blogService.findOne()`

**Response:** `BlogResponseDto`

```json
{
  "id": "string",
  "title": "string",
  "body": "string",
  "userId": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  },
  "tags": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}
```

### `POST /blogs`

Creates a new blog.

**Authentication:** Required (JWT)

**Service Method:** `blogService.create()`

**Request Body:** `BlogRequestDto`

```json
{
  "title": "string",
  "body": "string",
  "tagIds": [
    "string"
  ]
}
```

**Response:** `BlogResponseDto`

```json
{
  "id": "string",
  "title": "string",
  "body": "string",
  "userId": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  },
  "tags": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}
```

### `PUT /blogs/:id`

Updates a blog.

**Authentication:** Required (JWT)

**Service Method:** `blogService.update()`

**Request Body:** `UpdateBlogRequestDto`

```json
{
  "title": "string",
  "body": "string"
}
```

**Response:** `string`

```
"Ok"
```

### `DELETE /blogs/:id`

Deletes a blog.

**Authentication:** Required (JWT)

**Service Method:** `blogService.delete()`

**Response:** `string`

```
"Ok"
```

### `PUT /blogs/:id/add-tag`

Adds a tag to a blog.

**Authentication:** Required (JWT)

**Service Method:** `blogService.addBlogTag()`

**Request Body:** `AddBlogTag`

```json
{
  "tagId": "string"
}
```

**Response:** `string`

```
"Ok"
```

### `DELETE /blogs/:id/delete-tag/:tag_id`

Deletes a tag from a blog.

**Authentication:** Required (JWT)

**Service Method:** `blogService.deleteBlogTag()`

**Response:** `string`

```
"Ok"
```

### `GET /blogs/:id/comments`

Retrieves all comments for a specific blog.

**Authentication:** Required (JWT)

**Service Method:** `commentService.blogComments()`

**Response:** `CommentResponseDto[]`

```json
[
  {
    "body": "string",
    "blogId": "string",
    "id": "string",
    "user": {
      "id": "number",
      "name": "string"
    }
  }
]
```

### `POST /blogs/:id/comments`

Adds a comment to a blog.

**Authentication:** Required (JWT)

**Service Method:** `commentService.create()`

**Request Body:** `CommentRequestDto`

```json
{
  "body": "string"
}
```

**Response:** `CommentResponseDto`

```json
{
  "body": "string",
  "blogId": "string",
  "id": "string",
  "user": {
    "id": "number",
    "name": "string"
  }
}
```

### `DELETE /blogs/:id/comments/:comment_id`

Deletes a comment from a blog.

**Authentication:** Required (JWT)

**Service Method:** `commentService.deleteBlogComment()`

**Response:** `string`

```
"Ok"
```

---

## Tag Module

### `GET /tags`

Retrieves all tags.

**Service Method:** `tagService.findAll()`

**Response:** `TagResponseDto[]`

```json
[
  {
    "id": "string",
    "name": "string"
  }
]
```

### `POST /tags`

Creates a new tag.

**Service Method:** `tagService.create()`

**Request Body:** `TagRequestDto`

```json
{
  "name": "string"
}
```

**Response:** `TagResponseDto`

```json
{
  "id": "string",
  "name": "string"
}
```
