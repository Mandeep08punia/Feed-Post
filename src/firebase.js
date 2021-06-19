import firebase from 'firebase';
const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyBhI6z42IMH34OCYApO856AKM2W3Zis1mE",
    authDomain: "feed-post-a7804.firebaseapp.com",
    projectId: "feed-post-a7804",
    storageBucket: "feed-post-a7804.appspot.com",
    messagingSenderId: "832553750587",
    appId: "1:832553750587:web:505f0fef3859b20f558c1e"
});

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();
export {db,auth,storage};