import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { header } from "../reusablestyles/ReusableStyle";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SignUpLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: bold;
  margin-top: 10px;
`;

const Span = styled.div`
  color: black;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    width: 80%;
  }
`;
const EmailInput = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;
const PasswordInput = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;
const Header = styled(header)``;
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin: 10px auto;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userLogin = (e) => {
    setEmail("");
    setPassword("");
    e.preventDefault();
    if (!/\.(com|in|co)$/i.test(email)) {
      alert("Email must contain .com, .in, or .co domain.");
    }
    if (password.length < 6 || password === "") {
      alert("Password must be at least 6 characters long.");
      setEmail(email);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log(cred);
        alert("You have successfully logged in.");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-login-credentials") {
          alert(
            "Email or Password does not exist. Please Sign Up first if you haven't."
          );
        } else {
          alert("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <MainContainer>
      <Form onSubmit={userLogin}>
        <Header>Photo-Web-App</Header>
        <EmailInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">LOGIN</Button>
        <SignUpLink to="/signup">
          <Span>Don't have an account? </Span>Sign Up
        </SignUpLink>
      </Form>
    </MainContainer>
  );
};

export default Login;
