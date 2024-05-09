import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleLogin = () => {
  const handleSignInWithGoogle = async () => {
    signIn("google");
  };

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
    </section>
  );
};

export default GoogleLogin;
