import React, { useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import {
  form,
  button,
  emailInput,
  passwordInput,
  header,
} from "../reusablestyles/ReusableStyle";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Login = styled(Link)`
  text-decoration: none;
  color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: bold;
  margin-top: 20px;
`;

const Form = styled(form)``;
const EmailInput = styled(emailInput)``;
const PasswordInput = styled(passwordInput)``;
const Header = styled(header)``;
const Button = styled(button)``;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userSignUp = (e) => {
    e.preventDefault();
    if (!/\.(com|in|co)$/i.test(email)) {
      alert("Email must contain .com, .in, or .co domain.");
      return;
    }
    if (password.length < 6 || password === "") {
      alert("Password must be at least 6 characters long.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log(cred);
        setEmail("");
        setPassword("");
        alert("You have signed up successfully.");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MainContainer>
      <Form onSubmit={userSignUp}>
        <Header>Photo-Web-App</Header>
        <EmailInput
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></EmailInput>
        <PasswordInput
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></PasswordInput>

        <Button type="submit">SIGN UP</Button>
        <Login to="/login">LOGIN</Login>
      </Form>
    </MainContainer>
  );
};

export default SignUp;
