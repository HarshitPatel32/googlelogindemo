import React from "react";
import axios from "axios";
import { signIn, useSession, signOut } from "next-auth/react";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";

const GoogleLog = () => {
  const { data: session } = useSession();
  const user = session?.session?.user;

  const handleSignInWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      if (codeResponse && codeResponse.access_token) {
        try {
          const res = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${codeResponse.access_token}`,
                Accept: "application/json",
              },
            }
          );

          const signInResult = await signIn("credentials", {
            email: res.data.email,
            password: "", // Usually a token or some secure value, not empty string
            redirect: false,
          });

          if (signInResult?.error) {
            console.error("Sign in failed:", signInResult.error);
          } else {
            console.log("Sign in successful");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  return (
    <section className="buttonsection">
      <div className="google" onClick={handleSignInWithGoogle}>
        <p className="text">
          <span className="icon">
            <Image src="/images/Google.svg" alt="Google" width={24} height={24} />
          </span>
          Continue with Google
        </p>
      </div>
      {/* <div className="microsoft">
        <p className="text">
          <span className="icon">
            <Image src="/images/Microsoft.svg" alt="Microsoft" width={24} height={24} />
          </span>
          Continue with Microsoft
        </p>
      </div> */}
      {user && (
        <div className="logout">
          <label>{user?.email}</label>
          <button onClick={() => signOut({ redirect: false })}>Logout</button>
        </div>
      )}
    </section>
  );
};

export default GoogleLog;
