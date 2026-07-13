import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/dummy_db";
const client = new MongoClient(mongoUri);
const db = client.db(process.env.DB_CU || "dummy_db");

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || process.env.CLIENT_URI,
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "trader",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SEC as string,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user: Record<string, unknown>) => {
          return {
            data: {
              ...user,
              role: (user.role as string) || "trader",
            },
          };
        },
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
