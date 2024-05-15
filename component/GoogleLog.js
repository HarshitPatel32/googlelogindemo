import React, { useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";

const GoogleLog = () => {
  const { data: session } = useSession();
  const user = session?.session?.user;

  const handleSignInWithGoogle = async () => {
    signIn("google");
  };

  const handleSignInWithMicrosoft = async () => {
    signIn("azure-ad");
  };

  const handleSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleError = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <section className="buttonsection">
      <div className="google" onClick={handleSignInWithGoogle}>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
      <div className="google" onClick={handleSignInWithGoogle}>
        <p className="text">
          <span className="icon">
            <Image src="/images/Google.svg" alt="Google" width={24} height={24} />
          </span>
          Continue with Google
        </p>
      </div>
      <div className="microsoft" onClick={handleSignInWithMicrosoft}>
        <p className="text">
          <span className="icon">
            <Image src="/images/Microsoft.svg" alt="Microsoft" width={24} height={24} />
          </span>
          Continue with Microsoft
        </p>
      </div>
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
