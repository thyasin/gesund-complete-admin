import { initializeFirebase, 
    FirebaseAuth,
    FirebaseDatabase,
    FirestoreDatabase, } from "refine-firebase";


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export const firebaseConfig = {
    apiKey: "AIzaSyBw4Tv2ieTU96rx6h98DBZklT26xK98kxk",
    authDomain: "admin-panel-d019d.firebaseapp.com",
    projectId: "admin-panel-d019d",
    storageBucket: "admin-panel-d019d.appspot.com",
    messagingSenderId: "880449143423",
    appId: "1:880449143423:web:593f0180add93cb8d5b54a",
  };

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);



