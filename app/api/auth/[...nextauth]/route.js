import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import axios from "axios";
require("dotenv").config();

const YOUR_PLAYFAB_TITLE_ID = process.env.YOUR_PLAYFAB_TITLE_ID;

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        try {
          const response = await fetch(
            'http://localhost:3000/api/login',
            {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { 'Content-Type': 'application/json' },
            }
          );
          const user = await response.json();

          if (response.ok && user) {
            // Returned user object with token
            return {
              username: user.username,
              token: user.token,
              account: user.account
            };
          } else {
            return null;
          }
        } catch (error) {
          
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("User object:", JSON.stringify(user, null, 2)); 
        token.username = user.username;
        token.token = user.token;
        token.account = user.account;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.token = token.token;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },
  secret: process.env.JWT_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };