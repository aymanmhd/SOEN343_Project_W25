## Installing the Backend

1. **Clone the repository**
   ```bash
   git clone https://github.com/aymanmhd/SOEN343_Project_W25.git
   cd SOEN343_Project_W25
   cd backend
   npm install
   ```

2. **Run the project**
    ```bash
    npm start
    ```

# API Endpoints (Documentation)


## Authentication

### `POST /login`
- **Description**: Logs in a user and sets a JWT token in a cookie.
- **Request Body**:
   ```json
   {
      "username": "string",
      "password": "string"
   }
   ```
- **Response**: Redirects to `/account.html` on success or `/login.html` with an error message on failure.

### `POST /register`
- **Description**: Registers a new user. Only admins can register an admin account (registration is blocked if `isAdmin === true`, when it is not made by an authenticated admin).
- **Request Body**:
   ```json
   {
      "username": "string",
      "password": "string",
      "isAdmin": "boolean",  // only admins can register an admin account
      "fullName": "string"
   }
   ```
- **Response**: Json Account object created:
```json
{
    "username": "admin3",
    "password": "$2b$10$uWJjpS31lNnKBRhylxakq.nl7Rn4OgW6.jt4JzwhYkq6dUoB5Fcui",
    "isAdmin": false,
    "fullName": "Teo",
    "cartItems": [],
    "orders": [],
    "mails": [],
    "attendingEvents": [],
    "hostedEvents": [],
    "loginStreak": 1,
    "loginStreakRecord": 1,
    "_id": "67e48cc5e0bb991bd2a36df0",
    "lastLogin": "2025-03-26T23:24:53.754Z",
    "loginStreakStartDate": "2025-03-26T23:24:53.754Z",
    "loginStreakLastDate": "2025-03-26T23:24:53.754Z",
    "__v": 0
}
```

### `GET /logout`
- **Description**: Logs out the user by clearing the JWT token cookie.
- **Response**: Redirects to `/login.html` with a success message.

### `GET /check_login`
- **Description**: Checks if the user is logged in.
- **Response**: Returns `true` if logged in, otherwise throws an error.

## Events

### Event Class

The `Event` class represents the structure of an event object in the system.

```typescript
{^
   "_id": "string <ID of Event obj>",
   "name": "string",
   "date": "string (ISO format)",
   "location": "string",
   "price": "number",
   "description": "string",
   "speakers": "Array<Account>",
   "attendees": "Array<Account>"
}
```

### `POST /events`
- **Description**: Creates a new event.
- **Request Body**:
   ```json
   {
      "_id": "string <ID of Event obj>",
      "name": "string",
      "date": "string (ISO format)",
      "location": "string",
      "price": "number",
      "description": "string",
      "speakers": "<empty array>",
      "attendees": "<empty array>"
   }
   ```
- **Response**: Returns the created event object.

### `GET /events`
- **Description**: Retrieves a list of all events.
- **Response**: Returns an array of event objects.
- **Example Response**:
```json
[
    {
        "_id": "67e48ac6a730883e9a840e1e",
        "name": "Sample Event",
        "date": "2025-03-26T23:16:22.376Z",
        "location": "Sample Location",
        "price": 50,
        "description": "This is a sample event description.",
        "speakers": [
            {
                "_id": "67e48ac7a730883e9a840e32",
                "username": "speaker1",
                "fullName": "Speaker 1"
            }
        ],
        "attendees": [
            "67e48ac6a730883e9a840e1a"
        ],
        "__v": 2
    },
    {
        "_id": "67e48ac6a730883e9a840e20",
        "name": "Sample Event",
        "date": "2025-03-26T23:16:22.422Z",
        "location": "Sample Location",
        "price": 100,
        "description": "This is a sample event description.",
        "speakers": [],
        "attendees": [
            "67e48ac6a730883e9a840e1a"
        ],
        "__v": 1
    }
]
```

### `POST /events/add_speaker`
- **Description**: Adds a speaker to an existing event.
- **Request Body**:
   ```json
   {
      "eventId": "string <ID of Event obj>",
      "speakerId": "string <ID of Account obj>"
   }
   ```
- **Response**: Returns the updated event object with the new speaker added.

### `POST /events/add_attendee_manually`
- **Description**: Adds an attendee to an event without requiring a checkout process (free entry). Used by admins accounts to grant access through Admin Dashboard. **DO NOT USE THIS FOR NORMAL USERS**: they need to pass though the checkout process, i.e. by adding to cart first and checkout.
- **Request Body**:
   ```json
   {
      "eventId": "string <ID of Event obj>",
      "attendeeId": "string <ID of Account obj>"
   }
   ```
- **Response**: Returns the updated event object with the new attendee added.

## Transactions

### Cart Result Object

The cart object returned from these requests is an Array with the Event class.

```json
[
   {
      "_id": "67e484c6aeb31ef2e304426c",
      "name": "Sample Event",
      "date": "2025-03-26T22:50:46.566Z",
      "location": "Sample Location",
      "price": 50,
      "description": "This is a sample event description.",
      "speakers": [
         "67e484c7aeb31ef2e3044280"
      ],
      "attendees": [
         "67e484c6aeb31ef2e3044268"
      ],
      "__v": 2
   },
   {
      "_id": "67e484c6aeb31ef2e304426e",
      "name": "Sample Event",
      "date": "2025-03-26T22:50:46.612Z",
      "location": "Sample Location",
      "price": 100,
      "description": "This is a sample event description.",
      "speakers": [],
      "attendees": [
         "67e484c6aeb31ef2e3044268"
      ],
      "__v": 1
   }
]
```

### `POST /cart/add`
- **Description**: Adds an event to the user's cart.
- **Request Body**:
   ```json
   {
      "eventId": "string <ID of Event obj>"
   }
   ```
- **Response**: Returns the updated cart object.
- **Error responses**:
```json
{
   "error": "Event is already in cart",  // event already exists in cart
   "error": "Event not found",  // event with this event ID not found
   "error": "Failed to add to cart",  // unknown server error
}
```

### `POST /cart/remove`
- **Description**: Removes an event from the user's cart.
- **Request Body**:
   ```json
   {
      "eventId": "string <ID of Event obj>"
   }
   ```
- **Response**: Returns the updated cart.
- **Error responses**:
```json
{
   "error": "Event not found",  // event with this event ID not found in all Events (NOT CART)
   "error": "FFailed to remove from cart",  // unknown server error
}
```


### `POST /cart/clear`
- **Description**: Clears all items from the user's cart.
- **Response**: Returns the updated cart. (most likely empty array)


### `GET /cart`
- **Description**: Retrieves the current items in the user's cart.
- **Response**: Returns an array of event IDs in the cart. (Cart object)


### `POST /cart/checkout`
- **Description**: Checks out the user's cart.
- **Request Body**:
   ```json
   {
      "paymentCard": "string"
   }
   ```
- **Response**: Returns an Order object:
   ```typescript
   Order {
      "_id": "string <ID of Order obj>",
      "account": "string <ID of Account obj>",
      "date": "string (ISO format)",
      "paymentCard": "string",
      "totalPrice": "number",
      "items": "Array<string> <IDs of Event objs>"
   }
   ```

## Account

### Account Class

The `Account` class represents the structure of an account object in the system.

```typescript
{
   // basic info
   "username": "string",
   "password": "string",
   "isAdmin": "boolean",
   "fullName": "string",

   // checkout
   "cartItems": "Array<Event>",
   "orders": "Array<Order>",

   "mails": "Array<Mail>",

   // registered events
   "attendingEvents": "Array<Event>",  // as attendee
   "hostedEvents": "Array<Event>",  // as speaker

   "lastLogin": "string (ISO format)",  // when user last logged in
   "loginStreak": "number",  // current streak reached
   "loginStreakRecord": "number",  // max streak reached
   "loginStreakStartDate": "string (ISO format)",  // when streak started
   "loginStreakLastDate": "string (ISO format)"  // when streak incremented
}
```

### `GET /account`
**This is one of the most general and important endpoints. It allows retrieval of user's login details, information, cart (recommended through `GET /cart`), events attending and speaking to, and streak.**
- **Description**: Retrieves the account details of the logged-in user.
- **Response**: Returns the account object of the logged-in user.

## Mail

### Mail Class

The `Mail` class represents the structure of a mail object in the system.

```typescript
{
   "accountTo": "string",  // username field of Account
   "accountFrom": "string | null",  // username field of Account OR `null` indicating system message
   "timeSent": "string (ISO format)",
   "subject": "string",
   "message": "string"
}
```

### `GET /mail`
- **Description**: Retrieves all mail for the logged-in user.
- **Response**: Returns an array of mail objects.
- **Example Response**
```json
[
    {
        "_id": "67e47dfcec8983df124decc6",
        "accountFrom": null,
        "accountTo": {
            "_id": "67e47dfbec8983df124decb8",
            "username": "admin2",
            "fullName": "Admin"
        },
        "timeSent": "2025-03-26T22:21:48.364Z",
        "subject": "Order Confirmation",
        "message": "Thank you for your order. Your order ID is 67e47dfcec8983df124decc4.",
        "__v": 0
    },
    {
        "_id": "67e47dfcec8983df124decd4",
        "accountFrom": {
            "_id": "67e47dfbec8983df124decb8",
            "username": "admin2",
            "fullName": "Admin"
        },
        "accountTo": {
            "_id": "67e47dfbec8983df124decb8",
            "username": "admin2",
            "fullName": "Admin"
        },
        "timeSent": "2025-03-26T22:21:48.884Z",
        "subject": "Test Mail",
        "message": "This is a test mail.",
        "__v": 0
    }
]
```

### `POST /mail`
- **Description**: Sends a new mail.
- **Request Body**:
   ```json
   {
      "accountTo": "string",  // username field of Account obj
      "subject": "string",
      "message": "string"
   }
   ```
- **Response**: Returns the created mail object.
- **Example Response**:
```json
{
    "accountFrom": {
        "_id": "67e47e9e30f5375d18fcbccd",
        "username": "admin2",
        "fullName": "Admin"
    },
    "accountTo": {
        "_id": "67e47e9e30f5375d18fcbccd",
        "username": "admin2",
        "fullName": "Admin"
    },
    "timeSent": "2025-03-26T22:27:25.267Z",
    "subject": "Subjecthi",
    "message": "A very long meessage.",
    "_id": "67e47f4d30f5375d18fcbcf2",
    "__v": 0
}
```