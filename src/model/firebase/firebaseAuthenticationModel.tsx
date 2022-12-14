import { 
    getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,signOut
} from "firebase/auth";
import {initializeApp} from "firebase/app"
import { firebaseConfig } from "./firebaseConfig";
import {collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { ref, listAll, getBlob, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseBeat";


class firebaseError{
    errorMessage: string
    
    constructor(errMsg: string){
        this.errorMessage = errMsg
    }
}

export interface UserInformation{
    username: string
    email: string
    authID: string
    description: string
    profilePictureURL: string
}



const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const firestore = getFirestore()
/**
 * 
 * @returns returns a promise with the current users ID
 */
async function getCurrentUserID(): Promise<string>{    
    if (auth.currentUser){
        return auth.currentUser.uid}
    return ""
}

async function getUserInformation(userID:string):Promise<UserInformation>{    
    let docRef = doc(firestore, "users/", userID); 
    const userSnapshot = await getDoc(docRef);
    return ({ ...userSnapshot.data() } as UserInformation);
}

async function getProfilePictures(): Promise<string[]> {
    let sampleRef = ref(storage, 'profilePictures/')
    return listAll(sampleRef).then((res) => {
        return Promise.all(res.items.map((itemRef) => {
            return getDownloadURL(itemRef)
        }))

    }).catch((error) => {
        console.log(error)
        return []
    })
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
        let errorMsg = "unknown-issue";
        switch (error.code){
            case "auth/wrong-password":
                errorMsg = "Incorrect password"
                break;
            case "auth/user-not-found":
                errorMsg = "No such user found"
                break;
            case "auth/invalid-email":
                errorMsg = "Invalid e-mail address"
                break;
        }
        return new firebaseError(errorMsg);
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
        setDoc(doc(firestore,`users/${authUser.user.uid}`),{
            username: username,
            email: email,
            description:"",
            authID: authUser.user.uid,
            profilePictureURL: ""
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
    
async function setProfilePicture(newPicture:string): Promise<boolean>{
    //TODO unique username:
    return getCurrentUserID().then(async (userID)=>{       
        let userREF = doc(firestore,"users/", userID)
        await updateDoc(userREF, {
            profilePictureURL: newPicture
        });
        return true
    }).catch((e)=>{
        console.log(e)
        return false
    })
}

async function setUsername(newUsername:string): Promise<boolean>{
    return getCurrentUserID().then(async (userID)=>{       
        let userREF = doc(firestore,"users/", userID)
        await updateDoc(userREF, {
        username: newUsername
        });
        return true
    }).catch(()=>{
        return false
    })
}

/**
 * 
 * @returns the boolean value if a value is logged in
 */
async function isUserLoggedIn():Promise<boolean>{
    if (auth.currentUser)
        return true
    return false
}

/**
 * If an account is logged in it is signed out
 */
async function logOutAccount(){
    await signOut(auth)
}


export{getProfilePictures,setProfilePicture,setUsername,getUserInformation,getCurrentUserID,logOutAccount,isUserLoggedIn,createEmailPasswordAccount,loginEmailPasswordAccount}