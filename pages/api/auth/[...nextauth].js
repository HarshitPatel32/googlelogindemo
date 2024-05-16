import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const decodeJwtResponse = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let buffer = Buffer.from(base64, "base64");
  let decodedPayload = JSON.parse(buffer.toString("utf-8"));
  return decodedPayload;
};

const options = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        if (credentials.credential) {
          const data = decodeJwtResponse(credentials.credential);

          const user = {
            name: "",
            email: data.email,
          };
          return user;
        }
        return null;
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
