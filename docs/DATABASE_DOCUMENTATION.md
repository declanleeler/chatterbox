# MongoDB Schema for Chatterbox

## User Collection

### Schema Fields

- **\_id**: MongoDB ObjectId (default)
- **userId**: Int, required
- **login**: String, required

### Indices

- **\_id**: Default index
- **userId**:
- **login**:

## Chat Collection

### Schema Fields

- **\_id**: MongoDB ObjectId (default)
- **userId**: Int, required (foreign key to `User` collection)
- **createdOn**: Long, required
- **name**: String, required

### Indices

- **\_id**: Default index
- **userId**: Index to fetch conversations by user
- **createdOn**: Index for sorting or filtering by creation date

## Message Collection

### Schema Fields

- **\_id**: MongoDB ObjectId (default)
- **chatId**: String, required (foreign key to `Conversation` collection)
- **userId**: Int, required (foreign key to `User` collection or "system" for bot messages)
- **messageText**: String, required
- **createdOn**: Long, required

### Indices

- **\_id**: Default index
- **chatId**: Index to fetch all messages within a conversation
- **createdOn**: Index to sort or filter messages by creation date (e.g., chat history)
