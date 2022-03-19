import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import firebase from "firebase";

function Login() {
  const signIn = () => {
    // auth.signInWithPopup(provider).catch(alert);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (
    <div>
      <Container>
        <Head>
          <title>Login</title>
          <link
            rel="icon"
            href="https://icons.iconarchive.com/icons/dtafalonso/android-l/256/WhatsApp-icon.png"
          />
        </Head>
        <LoginContainer>
          <Logo src="https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png" />
          <Button onClick={signIn} variant="outlined">
            Sign in with Google
          </Button>
        </LoginContainer>
      </Container>
    </div>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  height: 213px;
  width: 300px;
  margin-bottom: 50px;
`;
