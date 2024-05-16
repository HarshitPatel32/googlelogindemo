import React, { useEffect } from "react";

const GoogleOneTapSignIn = () => {
  const onSuccess = (response) => {
    const { idToken } = response.credential;
    console.log(response, idToken);
  };

  const onError = (error) => {
    console.error("One-tap sign-in failed:", error);
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "738272769394-ar32r2u6pgnl8ejtkrvojh7k6drnfkk8.apps.googleusercontent.com",
      callback: onSuccess,
      cancel_on_tap_outside: false,
      state_cookie_domain: "googlelogindemo.netlify.app",
      prompt_parent_id: "google-signin-button",
      auto_select: true,
    });
  }, []);

  return <div id="google-signin-button"></div>;
};

export default GoogleOneTapSignIn;
