import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCi-fhmUoNm5fmRgNQloHHVDHf32VNqEU8",
    authDomain: "nfqfrontend.firebaseapp.com",
    databaseURL: "https://nfqfrontend.firebaseio.com",
    projectId: "nfqfrontend",
    storageBucket: "nfqfrontend.appspot.com",
    messagingSenderId: "816218547542",
    appId: "1:816218547542:web:030f5c83a1e035b2a5e2f7"
};

firebase.initializeApp(firebaseConfig);

export default firebase;