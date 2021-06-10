import firebase from 'firebase';
const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyBfc6N-Th8BjXQAuSdZFmSSJej8IZCHNEs",
    authDomain: "cipher-school-intern.firebaseapp.com",
    projectId: "cipher-school-intern",
    storageBucket: "cipher-school-intern.appspot.com",
    messagingSenderId: "928775776265",
    appId: "1:928775776265:web:7a484591b896c817f1f0d8"
});

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();
export {db,auth,storage};