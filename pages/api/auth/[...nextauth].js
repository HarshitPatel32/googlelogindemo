import NextAuth from "next-auth";
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
  ],
  callbacks: {
    async session(session) {
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
