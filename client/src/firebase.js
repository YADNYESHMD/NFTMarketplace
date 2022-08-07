import firebase from 'firebase/app'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCfsHpTiYbDlRtTLSaZNl73J6i1z99JXVs",
    authDomain: "nft14-278cc.firebaseapp.com",
    projectId: "nft14-278cc",
    storageBucket: "nft14-278cc.appspot.com",
    messagingSenderId: "671270961546",
    appId: "1:671270961546:web:8935f03531b5e4ef268873",
    measurementId: "G-91J6BVRWE0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export  {
    storage, firebase as default
}