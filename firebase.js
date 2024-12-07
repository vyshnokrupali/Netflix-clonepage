// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfibPPmGrjDZ3ABlej1-uBV8GwGC_8H4c",
  authDomain: "netflix-clone-57ffe.firebaseapp.com",
  projectId: "netflix-clone-57ffe",
  storageBucket: "netflix-clone-57ffe.firebasestorage.app",
  messagingSenderId: "1041902307124",
  appId: "1:1041902307124:web:fdee26810728a8a4618761",
  measurementId: "G-W6XS6ZYP9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{

        const res = await createUserWithEmailAndPassword(auth, email,password);
        const user= res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const login = async(email, password)=>{
    try{
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code);

    }
}
const logout=()=>{
    signOut(auth);
}

export{auth, db, login, signup,logout};