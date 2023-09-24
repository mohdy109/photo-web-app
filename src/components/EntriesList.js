import React, { useEffect, useState } from "react";
import { fetchData } from "../data/dataFetching";
import styled from "styled-components";
import { deleteEntry, updateEntry } from "../data/dataModification";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  height: 100%;
`;

const EntryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  flex: 1;
`;

const EntryImage = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
`;

const EntryDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const EntryName = styled.p`
  font-size: 16px;
  color: black;
  font-weight: bold;
`;

const EntryDate = styled.p`
  font-size: 14px;
  color: gray;
`;

const EntryTime = styled.p`
  font-size: 14px;
  color: gray;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const EntriesList = () => {
  const [entries, setEntries] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [entryToUpdate, setEntryToUpdate] = useState(null);

  useEffect(() => {
    const unsubscribe = fetchData(setEntries);
    return () => unsubscribe();
  }, []);

  const handleDeleteEntry = async (entryId) => {
    await deleteEntry(entryId);
  };

  const handleUpdateEntry = async () => {
    await updateEntry(entryToUpdate, updatedName);
    setUpdateMode(false);
  };

  const handleUpdateMode = (entryId, currentName) => {
    setUpdateMode(true);
    setUpdatedName(currentName);
    setEntryToUpdate(entryId);
  };

  return (
    <MainContainer>
      {entries.map((entry) => (
        <EntryContainer key={entry.id}>
          <EntryImage src={entry.imageUrl} alt={`Entry ${entry.name}`} />
          <EntryDetails>
            {updateMode && entry.id === entryToUpdate ? (
              <>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <UpdateButton onClick={handleUpdateEntry}>Update</UpdateButton>
              </>
            ) : (
              <>
                <EntryName>{entry.name}</EntryName>
                <EntryDate>Date: {entry.date}</EntryDate>
                <EntryTime>Time: {entry.time}</EntryTime>
                <DeleteButton onClick={() => handleDeleteEntry(entry.id)}>
                  Delete
                </DeleteButton>
                <UpdateButton
                  onClick={() => handleUpdateMode(entry.id, entry.name)}
                >
                  Edit
                </UpdateButton>
              </>
            )}
          </EntryDetails>
        </EntryContainer>
      ))}
    </MainContainer>
  );
};

export default EntriesList;
