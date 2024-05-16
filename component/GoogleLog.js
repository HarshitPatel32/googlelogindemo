import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLog = () => {
  const { data: session } = useSession();
  const user = session?.session?.user;

  const handleSuccess = async (response) => {
    if (response) {
      try {
        const signInResult = await signIn("credentials", {
          credential: response.credential,
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
  };

  const handleError = () => {
    console.log("Login Failed");
  };


  return (
    <section className="buttonsection">
      {!user && (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          shape="pill"
          theme="outline"
          size="large"
          text="continue_with"
          width="400"
        />
      )}
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
