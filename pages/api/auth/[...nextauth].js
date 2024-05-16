import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const options = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials.email) {
          return null;
        }

        const user = {
          name: "",
          email: credentials.email,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async session(session) {
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
