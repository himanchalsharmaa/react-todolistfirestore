import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseApp=initializeApp({
    apiKey: "AIzaSyC20ejtobf2cVEHicusNtkLbqDaF5BdKsw",
    authDomain: "react-todo-2cd90.firebaseapp.com",
    projectId: "react-todo-2cd90",
    storageBucket: "react-todo-2cd90.appspot.com",
    messagingSenderId: "1093962687734",
    appId: "1:1093962687734:web:52c1500be11674ac5af8d7",
    measurementId: "G-R8MGLBGEF6"
});

const db = getFirestore(firebaseApp);
export default db; 