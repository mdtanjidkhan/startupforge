import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("StartupForge");

export const auth = betterAuth({
   emailAndPassword: { 
    enabled: true, 
  },  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "collaborator"
      },
      isBlocked: {
        type: "boolean",
        required: true,
        defaultValue: false
      }
    }
  },

  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
  database: mongodbAdapter(db, {
   
    client
  }),
});