import React from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./Login.css";
import { auth, provider } from "./Firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";
import Footer from "./Footer";

function Login() {
  const [{ }, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
          alt="whatsapp.png"
        />
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn} className="google_signin">
          <GoogleIcon className="icon" />
          Sign in with Google
        </Button>
        <Button type="submit" onClick={signIn} className="facebook_signin">
          <FacebookIcon className="icon" />
          Sign in with Facebook
        </Button>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
