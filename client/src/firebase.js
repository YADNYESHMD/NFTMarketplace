import firebase from 'firebase/app'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCvotygQoyM1VZMXDgQAAgFZ-BFeS3Vkws",
    authDomain: "nftmarket-bed34.firebaseapp.com",
    projectId: "nftmarket-bed34",
    storageBucket: "nftmarket-bed34.appspot.com",
    messagingSenderId: "20741901392",
    appId: "1:20741901392:web:86cd8c437940dd94a39555",
    measurementId: "G-8D0MXP19YP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export  {
    storage, firebase as default
}