// src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID ?? "",
      clientSecret: process.env.AUTH0_SECRET ?? "",
      issuer: process.env.AUTH0_ISSUER,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === 'github') {
        token.accessToken = account.accessToken;
      }
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);

