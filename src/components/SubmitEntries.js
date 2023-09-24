import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { storage } from "../firebase/firebaseConfig";
import { auth } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestoreDb } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { flex, header } from "../reusablestyles/ReusableStyle";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Loader = styled.div`
  font-size: 30px;
  color: black;
  margin-top: 10px;
`;

const Header = styled(header)``;

const NameInput = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ImageInput = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  margin-left: 8rem;
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

const Logout = styled.button`
  background-color: #ff5733;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-right: 7.5rem;
  border-radius: 4px;
  font-size: 16px;
  position: relative;

  margin-left: 7.5rem;
  margin-top: -3rem;
`;
const Flex = styled(flex)``;

const SubmitEntry = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const logOut = async () => {
    try {
      setName("");
      setImage(null); 
      setLoading(false);
      await signOut(auth);
      console.log("Successful logout");
   
    } catch (err) {
      console.error(err);
    }
  };

  const fileInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fileInputRef.current.value = "";

    setLoading(true);

    const storageRef = ref(storage, `/entries/images/${image}`);
    await uploadBytes(storageRef, image);

    const imageUrl = await getDownloadURL(storageRef);

    await addDoc(collection(firestoreDb, "images"), {
      name: name,
      imageUrl: imageUrl,
      timestamp: new Date(),
    });
    setName("");
    setImage(null);
    setLoading(false);
  };

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit}>
        <Header>Submit Entry</Header>
        <NameInput
          type="text"
          placeholder="Enter a name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <ImageInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <Flex>
          <Button type="submit">Submit</Button>
        </Flex>
      </Form>
      <Logout onClick={logOut}>LOG OUT</Logout>
      {loading && <Loader>Loading...</Loader>}
    </MainContainer>
  );
};

export default SubmitEntry;
