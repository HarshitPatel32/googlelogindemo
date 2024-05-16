import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const decodeJwtResponse = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  // var jsonPayload = decodeURIComponent(
  //   window
  //     .atob(base64)
  //     .split("")
  //     .map(function (c) {
  //       return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  //     })
  //     .join("")
  // );
  // return JSON.parse(jsonPayload);

  let buffer = Buffer.from(base64, "base64");
  decodedPayload = JSON.parse(buffer.toString("utf-8"));
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
