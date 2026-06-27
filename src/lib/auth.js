import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

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
    session:{
         cookieCache:{
          enabled:true,
          strategy:"jwt",
          maxAge: 18 * 24 * 60 * 60
         },
    },
    plugins:[
      jwt()
    ],
  database: mongodbAdapter(db, {
   
    client
  }),
});