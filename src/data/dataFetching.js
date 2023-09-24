import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { firestoreDb } from "../firebase/firebaseConfig";

export const fetchData = (setData) => {
  const q = query(
    collection(firestoreDb, "images"),
    orderBy("timestamp", "desc")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const images = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const timestamp = data.timestamp.toDate();
      images.push({
        id: doc.id,
        imageUrl: data.imageUrl,
        name: data.name,
        date: timestamp.toLocaleDateString(),
        time: timestamp.toLocaleTimeString(),
      });
    });
    setData(images);
  });
  return unsubscribe;
};
