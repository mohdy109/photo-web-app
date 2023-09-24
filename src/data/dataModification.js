import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase/firebaseConfig";

export const deleteEntry = async (entryId) => {
  try {
    const entryRef = doc(firestoreDb, "images", entryId);
    await deleteDoc(entryRef);
  } catch (error) {
    console.log(error);
  }
};

export const updateEntry = async (entryId, updatedName) => {
  try {
    const entryRef = doc(firestoreDb, "images", entryId);
    await updateDoc(entryRef, {
      name: updatedName,
    });
  } catch (error) {
    console.log(error);
  }
};
