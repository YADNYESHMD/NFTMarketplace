import firebase from 'firebase/app'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDhAVoAnmCU1muTFbs1rxhXpl_O0qrkl_M",
    authDomain: "cosmopedia-8f488.firebaseapp.com",
    projectId: "cosmopedia-8f488",
    storageBucket: "cosmopedia-8f488.appspot.com",
    messagingSenderId: "1004987382611",
    appId: "1:1004987382611:web:7a9065b04ba460bf257fa6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export  {
    storage, firebase as default
}