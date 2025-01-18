// Run using mongosh: mongosh <path_to_repo>/backend/scripts/setup_mongodb.js

// Create User Collection with schema validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["login", "userId"],
      properties: {
        userId: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        login: {
          bsonType: "string",
          description: "optional string for user's display name",
        },
        createdOn: {
          bsonType: "date",
          description: "timestamp when the document was created",
        },
      },
    },
  },
});

// Create indices for User Collection
db.users.createIndex({ userId: 1 });
db.users.createIndex({ chatId: 1 });

// Create Chats Collection with schema validation
db.createCollection("chats", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "createdOn", "name"],
      properties: {
        userId: {
          bsonType: "int",
          description: "Must be a valid int and is required",
        },
        name: {
          bsonType: "string",
          description: "Must be a valid string and is required",
        },
        createdOn: {
          bsonType: "long",
          description: "Must be a valid date and is required",
        },
      },
    },
  },
});

// Create indices for Conversations Collection
db.chats.createIndex({ userId: 1 });
db.chats.createIndex({ createdOn: 1 });

// Create Messages Collection with schema validation
db.createCollection("messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["chatId", "userId", "messageText", "createdOn"],
      properties: {
        chatId: {
          bsonType: "string",
          description:
            "must be a string and is required, foreign key to 'User' collection or 'system'",
        },
        userId: {
          bsonType: "string",
          description:
            "must be a string and is required, foreign key to 'User' collection or 'system'",
        },
        messageText: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        createdOn: {
          bsonType: "long",
          description: "timestamp when the message was created",
        },
      },
    },
  },
});

// Create indices for Messages Collection
db.messages.createIndex({ conversationId: 1 });
db.messages.createIndex({ createdOn: 1 });
