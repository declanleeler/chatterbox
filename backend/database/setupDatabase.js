// Run using mongosh: mongosh <path_to_repo>/backend/scripts/setup_mongodb.js

// Create User Collection with schema validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "googleId"],
      properties: {
        email: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        googleId: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        name: {
          bsonType: "string",
          description: "optional string for user's display name",
        },
        createdOn: {
          bsonType: "date",
          description: "timestamp when the document was created",
        },
        updatedOn: {
          bsonType: "date",
          description: "timestamp when the document was last updated",
        },
      },
    },
  },
});

// Create indices for User Collection
db.users.createIndex({ googleId: 1 });
db.users.createIndex({ conversationId: 1 });

// Create Conversations Collection with schema validation
db.createCollection("conversations", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["googleId", "conversationId", "createdOn"],
      properties: {
        googleId: {
          bsonType: "string",
          description:
            "must be a string and is required, foreign key to 'User' collection",
        },
        conversationId: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        status: {
          bsonType: "string",
          description: "optional string for conversation status",
        },
        createdOn: {
          bsonType: "date",
          description: "timestamp when the conversation was created",
        },
        updatedOn: {
          bsonType: "date",
          description: "timestamp when the conversation was last updated",
        },
      },
    },
  },
});

// Create indices for Conversations Collection
db.conversations.createIndex({ googleId: 1 });
db.conversations.createIndex({ conversationId: 1 });
db.conversations.createIndex({ status: 1 });
db.conversations.createIndex({ createdOn: 1 });

// Create Messages Collection with schema validation
db.createCollection("messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["conversationId", "senderId", "messageText", "createdOn"],
      properties: {
        conversationId: {
          bsonType: "string",
          description:
            "must be a string and is required, foreign key to 'Conversation' collection",
        },
        senderId: {
          bsonType: "string",
          description:
            "must be a string and is required, foreign key to 'User' collection or 'system'",
        },
        messageText: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        createdOn: {
          bsonType: "date",
          description: "timestamp when the message was created",
        },
      },
    },
  },
});

// Create indices for Messages Collection
db.messages.createIndex({ conversationId: 1 });
db.messages.createIndex({ createdOn: 1 });
