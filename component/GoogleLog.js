import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";

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

  const handleSuccess = (response) => {
    console.log(response);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <section className="buttonsection">
      {/* <div className="google">
        <p className="text">
          <span className="icon">
            <Image src="/images/Google.svg" alt="Google" width={24} height={24} />
          </span>
          Continue with Google
        </p>
      </div> */}
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={handleError}
        useOneTap
        shape="pill"
        theme="outline"
        size="large"
        text="continue_with"
      />
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
