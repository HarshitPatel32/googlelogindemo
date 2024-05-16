import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLog = () => {
  const { data: session } = useSession();
  const user = session?.session?.user;

  // useGoogleOneTapLogin({
  //   onSuccess: credentialResponse => {
  //     console.log(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log('Login Failed');
  //   },
  // });

  // const handleSignInWithGoogle = useGoogleLogin({
  //   onSuccess: async (codeResponse) => {
  //     console.log(codeResponse);
  //     if (codeResponse && codeResponse.access_token) {
  //       try {
  //         const res = await axios.get(
  //           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${codeResponse.access_token}`,
  //               Accept: "application/json",
  //             },
  //           }
  //         );

  //         const signInResult = await signIn("credentials", {
  //           email: res.data.email,
  //           password: "",
  //           redirect: false,
  //         });

  //         if (signInResult?.error) {
  //           console.error("Sign in failed:", signInResult.error);
  //         } else {
  //           console.log("Sign in successful");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user info:", error);
  //       }
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Login Failed:", error);
  //   },
  // });

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

  const handleSuccess = (response) => {
    console.log(response.Credential);
    console.log(decodeJwtResponse(response.Credential));
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <section className="buttonsection">
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={handleError}
        useOneTap
        shape="pill"
        theme="outline"
        size="large"
        text="continue_with"
        width="400"
      />
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
