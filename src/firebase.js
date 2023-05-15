import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCCghx-WYyYZCxXiKOSCymOYuHHa4fmvRA",
    authDomain: "react-project5-47df6.firebaseapp.com",
    projectId: "react-project5-47df6",
    storageBucket: "react-project5-47df6.appspot.com",
    messagingSenderId: "1044119062711",
    appId: "1:1044119062711:web:2677e33f4dfe7130ed2532"
  };

  
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);