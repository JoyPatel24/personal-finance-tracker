import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, provider } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [LoginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name", name);
    // Authenticate the user, or basically create a new account using email and password
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User>>>>", user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
            // Create a document with user id as the following id
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ...
          });
      } else {
        toast.error("Password and Confirm Password are different!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    console.log("email", email);
    console.log("password", password);
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("User Logged In", user);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);
    // Make sure that the doc with uid doesn't exist
    // Create a doc.
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists!");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>>", user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User authenticated!")
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (e) {
        setLoading(false);
      toast.error(e.message);
    }
  }

  return (
    <>
      {LoginForm ? (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
              Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
            </h2>
            <form>
              <Input
                type="email"
                label={"Email"}
                placeholder={"johndoe@gmail.com"}
                state={email}
                setState={setEmail}
              />
              <Input
                type="password"
                label={"Password"}
                placeholder={"Example@123"}
                state={password}
                setState={setPassword}
              />
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login using Email & Password"}
                onClick={loginUsingEmail}
              />
              <p className="p-login">or</p>
              <Button
                onClick={googleAuth}
                text={loading ? "Loading..." : "Login using Google"}
                blue={true}
              />
              <p
                className="p-login"
                style={{ cursor: "pointer" }}
                onClick={() => setLoginForm(!LoginForm)}
              >
                or Don't Have An Account Already? Click Here
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
              Sign Up on{" "}
              <span style={{ color: "var(--theme)" }}>Financely.</span>
            </h2>
            <form>
              <Input
                label={"Full Name"}
                placeholder={"John Doe"}
                state={name}
                setState={setName}
              />
              <Input
                type="email"
                label={"Email"}
                placeholder={"johndoe@gmail.com"}
                state={email}
                setState={setEmail}
              />
              <Input
                type="password"
                label={"Password"}
                placeholder={"Example@123"}
                state={password}
                setState={setPassword}
              />
              <Input
                type="password"
                label={"Confirm Password"}
                placeholder={"Example@123"}
                state={confirmPassword}
                setState={setConfirmPassword}
              />
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Signup using Email & Password"}
                onClick={signupWithEmail}
              />
              <p className="p-login">or</p>
              <Button
                onClick={googleAuth}
                text={loading ? "Loading..." : "Signup using Google"}
                blue={true}
              />
              <p
                className="p-login"
                style={{ cursor: "pointer" }}
                onClick={() => setLoginForm(!LoginForm)}
              >
                or Have An Account Already? Click Here
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default SignupSignin;
