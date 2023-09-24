import React, { useState } from "react";
import styled from "styled-components";
import { storage } from "../firebase/firebaseConfig";
import { auth } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestoreDb } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useRef } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  button,
  emailInput,
  flex,
  form,
  header,
} from "../reusablestyles/ReusableStyle";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled(form)``;

const Loader = styled.div`
  font-size: 30px;
  color: black;
  margin-top: 10px;
`;

const Header = styled(header)``;

const NameInput = styled(emailInput)``;

const ImageInput = styled(emailInput)``;

const Button = styled(button)`
  margin-left: 8rem;
`;

const Logout = styled(button)`
  background-color: #ff5733;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-right: 7.5rem;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;
const Flex = styled(flex)``;

const SubmitEntry = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Successful logout");
        navigate("/login");
      })
      .catch((err) => console.log(err));
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
          <Logout onClick={logOut}>LOG OUT</Logout>
        </Flex>
      </Form>
      {loading && <Loader>Loading...</Loader>}
    </MainContainer>
  );
};

export default SubmitEntry;
