import { getAuth,onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator, signOut} from "firebase/auth";
import {initializeApp} from "firebase/app"
import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
connectAuthEmulator(auth,"http://localhost:9099")

async function loginEmailPasswordAccount(email: string, password: string){
    try{
        let userCredantialPromise = await signInWithEmailAndPassword(auth, email,password)
        return userCredantialPromise
    }catch(error){
        return error
    }
}

async function createEmailPasswordAccount(email: string, password: string){
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email,password)
        return userCredential
    }catch(error){  
        return error    
    }
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

export{logOutAccount,isUserLoggedIn,createEmailPasswordAccount,loginEmailPasswordAccount}