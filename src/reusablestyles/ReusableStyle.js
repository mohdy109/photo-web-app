import styled from "styled-components";
import { Link } from "react-router-dom";

export const form = styled.form`
  background-color: #fff;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const emailInput = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const passwordInput = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const button = styled.button`
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

export const header = styled.h1`
  margin-bottom: 40px;
  font-size: 24px;
`;

export const signUpLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: bold;
  margin-top: 10px;
`;

export const flex = styled.div`
  display: flex;
`;
