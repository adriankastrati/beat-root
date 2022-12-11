import { 
    getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,signOut
} from "firebase/auth";
import {initializeApp} from "firebase/app"
import { firebaseConfig } from "./firebaseConfig";
import {doc, getFirestore, setDoc } from "firebase/firestore";


class firebaseError{
    errorMessage: string
    
    constructor(errMsg: string){
        this.errorMessage = errMsg
    }
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const fs = getFirestore()
/**
 * 
 * @returns returns a promise with the current users ID
 */
async function getCurrentUserID(): Promise<string|null>{    
    if (auth.currentUser){
        return auth.currentUser.uid}
    return null
}

/**s
 * 
 * @param email - email for account
 * @param password - password for account
 * 
 * if succesfull login use @getCurrentUserID to get uuid
 * An error is returned with message "wrong-password-mail" if there is issue with the mail or password, 
 * if the issue is unknown a error with the message is "unknown-issue";
 */
async function loginEmailPasswordAccount(email: string, password: string): Promise<null|firebaseError>{
    return signInWithEmailAndPassword(auth, email,password).then(()=>{
        return null;
    }).catch((error)=>{
    if("auth/wrong-password" && "auth/user-not-found"){
       return new firebaseError("wrong-password-mail");
    }else{
        return new firebaseError(error.code)
    }    
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

async function createEmailPasswordAccount(email: string, username:string, password: string): Promise<firebaseError|null>{
   //TODO unique username:
    return createUserWithEmailAndPassword(auth, email,password).then((authUser)=>{
        setDoc(doc(fs,`users/${authUser.user.uid}`),{
            username: username,
            email: email,
            description:"",
            authID: authUser.user.uid
        })
        return null
    }).catch((error)=>{
        let errorMsg = "unknown-issue";
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
        return new firebaseError(errorMsg)
    })
}
    
async function isUserLoggedIn():Promise<boolean>{
    if (auth.currentUser)
        return true
    return false
}


async function logOutAccount(){
    await signOut(auth)
}


export{getCurrentUserID,logOutAccount,isUserLoggedIn,createEmailPasswordAccount,loginEmailPasswordAccount}