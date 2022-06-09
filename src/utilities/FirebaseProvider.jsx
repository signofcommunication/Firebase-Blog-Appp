import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import * as firebase from "./firebase";

const FirebaseContext = createContext();

function FirebaseProvider({ children }) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [datas, setDatas] = useState([]);
  const [specificData, setSpecificData] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  async function addNewBlog() {
    await setDoc(doc(firebase.db, "users", name), {
      usernames: name,
      email,
    });
  }

  async function addSubContent(title, description) {
    const q = query(collection(firebase.db, "users"));
    const querySnapshot = await getDocs(q);
    const id = uuidv4();
    const queryData = querySnapshot.docs.map(detail => ({
      ...detail.data(),
      id: detail.id,
    }));

    queryData.map(async v => {
      await setDoc(doc(firebase.db, `users/${name}/blog-details`, id), {
        title,
        description,
        id,
      });
    });
  }

  async function getAllData() {
    try {
      const data = await getDocs(
        collection(firebase.db, `users/${name}/blog-details`)
      );
      setDatas(data.docs?.map(item => item.data()));
    } catch (error) {
      console.log(error);
    }
  }

  async function getSpecificData(dataName) {
    try {
      const docRef = doc(firebase.db, `users/${name}/blog-details`, dataName);
      const docSnap = await getDoc(docRef);
      setSpecificData(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData(data) {
    try {
      const ref = doc(firebase.db, `users/${name}/blog-details`, data.detail);
      await updateDoc(ref, {
        title: data.title,
        description: data.description,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteData(detail) {
    try {
      await deleteDoc(doc(firebase.db, `users/${name}/blog-details`, detail));
    } catch (e) {
      console.log(e);
    }
  }

  async function googleLogin() {
    return signInWithPopup(auth, googleProvider);
  }

  async function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
    return () => unsubscribe();
  }, []);

  const value = {
    addSubContent,
    addNewBlog,
    setName,
    setEmail,
    name,
    logout,
    googleLogin,
    user,
    error,
    getAllData,
    datas,
    getSpecificData,
    specificData,
    updateData,
    deleteData,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

function useAuth() {
  const auth = useContext(FirebaseContext);
  return { ...auth, isAuthenticated: auth.user != null };
}

export { useAuth, FirebaseProvider };
