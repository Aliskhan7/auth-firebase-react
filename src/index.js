import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC8UVZPYh4BsQPKU3JI29iTKZIMvSjkybI",
    authDomain: "react-chat-aaa4d.firebaseapp.com",
    projectId: "react-chat-aaa4d",
    storageBucket: "react-chat-aaa4d.appspot.com",
    messagingSenderId: "42113426539",
    appId: "1:42113426539:web:04804deef6eb7ba64e3d2e",
    measurementId: "G-N50VCMDRMS"
});
export const Context = createContext(null)

const auth = firebase.auth();
const firestore = firebase.firestore();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider
        value={{
            firebase,
            auth,
            firestore
        }}
    >
        <App />
    </Context.Provider>

);
