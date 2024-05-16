import React, { useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";

const GoogleLog = () => {
  const { data: session } = useSession();
  const user = session?.session?.user;

  if (!user) {
    useGoogleOneTapLogin({
      onSuccess: (credentialResponse) => {
        handleSuccess(credentialResponse);
      },
      onError: () => {
        handleError();
      },
    });
  }

  const handleSuccess = async (response) => {
    const data = decodeJwtResponse(response.credential);
    if (data && data.email) {
      try {
        const signInResult = await signIn("credentials", {
          email: data.email,
          password: "",
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

  const decodeJwtResponse = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
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
