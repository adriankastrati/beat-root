import { 
    getAuth,onAuthStateChanged, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, updateProfile,
    signOut,
    connectAuthEmulator,
    User,
    Auth
} from "firebase/auth";
import {initializeApp} from "firebase/app"
import { firebaseConfig } from "./firebaseConfig";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const fs = getFirestore()
/**
 * 
 * @returns returns a promise with the current users ID
 */
async function getCurrentUserID(): Promise<string|null>{
    const userRef = collection(fs, "users");
    
    if (auth.currentUser){
        return await getDocs(query(userRef, where("authID", "==", auth.currentUser.uid))).then(query=>{
            return query.docs[0].id
    });}
    return null
}

/**
 * 
 * @param email - email for account
 * @param password - password for account
 * 
 * if succesfull login use @getCurrentUserID to get user details
 * Error is thrown with message "wrong-password" or "invalid-email", if unknown issue is thrown message is "unknown-issue";
 */
async function loginEmailPasswordAccount(email: string, password: string){
        signInWithEmailAndPassword(auth, email,password).catch((error)=>{
        console.log(error)
        let errorMsg = "unknown-issue"
        switch (error.code){
            case "auth/wrong-password":
                errorMsg = "wrong-password";
                break;
 
            case "auth/user-not-found":
                errorMsg = "invalid-email";
                break;
        }
        throw new Error(errorMsg)
     })
}


/**
 * Error message thrown shows "weak-password", "invalid-email", "email-already-in-use", 
 * other error messages are thrown with message "unknown-issue"
 * 
 * if succesfull creation an an empty, the user is logged in and use @getCurrentUserID to get user details
 * 
 * @param email - email for user, must be new
 * @param username - must be unique
 * @param password - must be atleast 6 characthers
 */

async function createEmailPasswordAccount(email: string, username:string, password: string){
   //TODO unique username
    createUserWithEmailAndPassword(auth, email,password).then((authUser)=>
        addDoc(collection(fs,"users"),{
            username: username,
            email: email,
            description:"",
            authID: authUser.user.uid
        })).catch((error)=>{
       let errorMsg = "unknown-issue";
        console.log(error)
        switch (error.code){
            case "auth/email-already-in-use":
                errorMsg = "email-already-in-use";
                break;

            case "auth/invalid-email":
                errorMsg = "invalid-email";
                break;

            case "auth/weak-password":
                errorMsg = "weak-password";
                break;
        }
        throw new Error(errorMsg)
    })
}


async function isUserLoggedIn(){
   return onAuthStateChanged(auth, user=>{
        if(user)
            return true
        else if(!user){
            return false
        }
    })
}

async function logOutAccount(){
    await signOut(auth)
}


export{getCurrentUserID,logOutAccount,isUserLoggedIn,createEmailPasswordAccount,loginEmailPasswordAccount}