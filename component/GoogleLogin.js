import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";

const GoogleLogin = () => {
  const { data: session } = useSession();
  const user = session?.session?.user;

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
      <label>{user?.email}</label>
    </section>
  );
};

export default GoogleLogin;
