 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

 import { getFirestore, addDoc, getDocs, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDGtCAyu-LOkQJLwl8zyPO7paBkUJ_k-wQ",
   authDomain: "dogo-c3015.firebaseapp.com",
   projectId: "dogo-c3015",
   storageBucket: "dogo-c3015.appspot.com",
   messagingSenderId: "115569106869",
   appId: "1:115569106869:web:c24d5927bcba6ab82b43fc"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);

 const commentsCol = collection(db, "comments");

 window.signup = function(email, password) {//create new user

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  alert('user signed up!');

}

window.login = function(email, password) { //login user

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  alert('logged in');
}

window.logout = function(){
    auth.signOut();
}

window.onLogin = function(f) {

onAuthStateChanged(auth, user => {

    f( user );
});
}

window.addComment = function(comment) {

    return addDoc(commentsCol, {comment, created: serverTimestamp() });

}

window.forEachComment = async function( f ){

    var docs = await getDocs(commentsCol);

    docs.forEach( doc => f(doc.data()) );

}