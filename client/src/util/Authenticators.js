import {auth} from "./Firebase"
import {
    signOut, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider} from "firebase/auth"
/*
Provides async functions for signing in, out, and resets
The creation of user is handled by the python backend using firebase-admin
*/

// methods for signing in
export const emailSignIn = async (email, password) =>{
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
}

export const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
}

// the sign out method
export const logOut = () => {
    signOut(auth).then(() => {
        console.log('Signout Succesfull')
      }).catch((error) => {
        console.log('Signout Failed')
      });
}
