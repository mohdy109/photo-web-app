import React from "react";
import styled from "styled-components";

import SubmitEntry from "../components/SubmitEntries";
import EntriesList from "../components/EntriesList";

const Main = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  min-height: 100vh;
  gap: 3rem;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 36px;
  margin-bottom: 50px;
  display: block;
  color: #333;
`;

const Home = () => {
  return (
    <Main>
      <Header>Photo-Web-App </Header>
      <SubmitEntry />
      <EntriesList />
    </Main>
  );
};

export default Home;
