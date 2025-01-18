# MongoDB Schema for Chatterbox

## User Collection

### Schema Fields

- **\_id**: MongoDB ObjectId (default)
- **email**: String, required
- **googleId**: String, required
- **name**: String, optional
- **createdOn**: Date, required
- **updatedOn**: Date, optional

### Indices

- **\_id**: Default index
- **email**: Ensures unique email addresses for each user and enables efficient lookups during authentication or administrative queries.
- **googleId**: Ensures uniqueness of Google SSO identifiers, enabling fast lookups and user retrieval during SSO-based authentication.

## Conversation Collection

### Schema Fields

- **\_id**: MongoDB ObjectId (default)
- **googleId**: String, required (foreign key to `User` collection)
- **conversationId**: String, required
- **status**: String, optional
- **createdOn**: Date, required
- **updatedOn**: Date, optional

### Indices

- **\_id**: Default index
- **googleId**: Index to fetch conversations by user
- **conversationId**: Index for efficient session retrieval
- **status**: Index to filter conversations by status
- **createdOn**: Index for sorting or filtering by creation date

## Message Collection

### Schema Fields

- **\_id**: MongoDB ObjectId (default)
- **conversationId**: String, required (foreign key to `Conversation` collection)
- **userId**: String, required (foreign key to `User` collection or "system" for bot messages)
- **messageText**: String, required
- **createdOn**: Date, required

### Indices

- **\_id**: Default index
- **conversationId**: Index to fetch all messages within a conversation
- **createdOn**: Index to sort or filter messages by creation date (e.g., chat history)
