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
      required: ["_id", "googleId", "createdOn"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Must be a valid ObjectId and is required",
        },
        googleId: {
          bsonType: "string",
          description: "Must be a valid string and is required",
        },
        status: {
          bsonType: "string",
          description: "Optional field to track the status",
        },
        createdOn: {
          bsonType: "date",
          description: "Must be a valid date and is required",
        },
        updatedOn: {
          bsonType: "date",
          description: "Optional field for the last updated timestamp",
        },
      },
    },
  },
});

// Create indices for Conversations Collection
db.conversations.createIndex({ googleId: 1 });
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
          bsonType: "objectId",
          description:
            "Must reference a valid Conversation._id and is required",
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
