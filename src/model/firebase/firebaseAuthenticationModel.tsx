import { 
    getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,signOut, sendPasswordResetEmail
} from "firebase/auth";
import {FirebaseError, initializeApp} from "firebase/app"
import { firebaseConfig } from "./firebaseConfig";
import {arrayRemove, arrayUnion, collection, doc, getDoc, getFirestore, runTransaction, setDoc, Transaction, updateDoc, writeBatch } from "firebase/firestore";
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
async function getCurrentUserID(): Promise<string|null>{    
    if (auth.currentUser){
        return auth.currentUser.uid}
    return null
}

async function getUserInformation(userID:string):Promise<UserInformation>{    
    let docRef = doc(firestore, "users/", userID); 
    const userSnapshot = await getDoc(docRef);
    return ({ ...userSnapshot.data() } as UserInformation);
}

// async function getProfilePictures(): Promise<string[]> {
 //     let sampleRef = ref(storage, 'profilePictures/')
 //     return listAll(sampleRef).then((res) => {
 //         return Promise.all(res.items.map((itemRef) => {
 //             return getBlob(itemRef).then(blob=>{
 //                 console.log()
 //                 return URL.createObjectURL(blob)
 //             })
 //         }))
 //     }).catch((error) => {
 //         console.log(error)
 //         return []
 //     });
 // }

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

/**
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
        let errorMsg = "wrong password or invalid email";
        switch (error.code){
            case "auth/wrong-password":
                errorMsg = "wrong password or invalid email"
                break;
            case "auth/user-not-found":
                errorMsg = "No such user found"
                break;
            case "auth/invalid-email":
                errorMsg = "wrong password or invalid email"
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
            username: authUser.user.uid,
            email: email,
            description:"",
            authID: authUser.user.uid,
            profilePictureURL: ""
        })
        setProfilePicture("https://firebasestorage.googleapis.com/v0/b/beat-root-a8d72.appspot.com/o/profilePictures%2FDALL·E%202022-12-19%2011.37.18%20-%20image%20of%20missing%20profile%20picture%20with%20a%20beet%20as%20unknown%20and%20a%20white%20stylized%20question%20mark%20in%20the%20erased%20area%20.png?alt=media&token=785bd4d7-d325-406c-9578-e1c1d4ea0509")
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
        if (!userID)
            return false
        let userREF = doc(firestore,"users/", userID)
        await updateDoc(userREF, {
            profilePictureURL: newPicture
        });
        return true
    }).catch((e)=>{
        console.log(e, "failed profilePic change")
        
        return false
    })
}

async function setDescription(newDescription:string): Promise<boolean>{
    return getCurrentUserID().then(async (userID)=>{  
        if(!userID)
            return false     
        let userREF = doc(firestore,"users/", userID)
        await updateDoc(userREF, {
        description: newDescription
        });
        return true
    }).catch((e)=>{
        console.log(e)
        return false
    })
}

/*
async function switchUsername(newUsername: string):Promise<void|FirebaseError>{
    getCurrentUserID().then(async (userID)=>{
        if (!userID){
            return 
        }
        
        getUserInformation(userID).then(async (info)=>{
        
            runTransaction(firestore, async (transaction)=>{

                let userREF = doc(firestore,"users/", userID)
                transaction.update(userREF, {
                    username: newUsername
                });

                let userListREF = doc(firestore,"profileConditions/usernames")
                transaction.update(userListREF, {
                    takenUsernames: arrayUnion(newUsername)
                });

                transaction.update(userListREF, {
                    takenUsernames: arrayRemove(info.username)
                });
            }).catch(e=>{return new firebaseError("failed-username-change")})
            
        })
    })
} */

async function switchUsername(newUsername: string):Promise<void|firebaseError>{
    console.log(newUsername)
    let userListREF = doc(firestore,"profileConditions/usernames")

    return getDoc(userListREF).then(async usernames=>{
        if(usernames.exists()){
            if(Array.from(usernames.data().takenUsernames as any).includes(newUsername)){
                return new firebaseError("taken-username")           
            }
            return getCurrentUserID().then(async (userID)=>{
                if (!userID){
                    return new firebaseError("not-logged-in")           
                }

                return getUserInformation(userID).then(async (info)=>{
                    runTransaction(firestore, async (transaction)=>{
        
                        let userREF = doc(firestore,"users/", userID)
                        transaction.update(userREF, {
                            username: newUsername
                        });
        
                        transaction.update(userListREF, {
                            takenUsernames: arrayUnion(newUsername)
                        });
        
                        transaction.update(userListREF, {
                            takenUsernames: arrayRemove(info.username)
                        });
                    }).catch(()=>{
                        return new firebaseError("try again")           
                    })
                }).catch(e=>{
                    return new firebaseError("try again")           
                })
            })
        }
    })
}

async function removeUsername(oldUsername:string): Promise<boolean>{
    
    
    return getCurrentUserID().then(async (userID)=>{ 
        if (!userID)   
            return false   

        return getUserInformation(userID).then(async (info)=>{
        let userListREF = doc(firestore,"profileConditions/usernames")
        await updateDoc(userListREF, {
            takenUsernames: arrayRemove(info.username)
            });
        return true
    })
    }).catch((e)=>{
        console.log(e, "failed username change")
        return false
    })
}

async function setUsername(newUsername:string): Promise<boolean>{
    getCurrentUserID().then(async (userID)=>{
        if(!userID)       
            return false
            
        let userListREF = doc(firestore,"profileConditions/usernames")
        
        await updateDoc(userListREF, {    
            takenUsernames: arrayUnion(newUsername)
        });

        let userREF = doc(firestore,"users/", userID)
        await updateDoc(userREF, {
        username: newUsername
        });

        return true
        

    }).catch((e)=>{
        return false
    })
    return false
}

async function resetPassword(email: string): Promise<boolean>{
    try{
        await sendPasswordResetEmail(auth,email)
        return true
    }catch(e){
    return false
    }
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


export{switchUsername,resetPassword,removeUsername,setDescription, getProfilePictures,setProfilePicture,setUsername,getUserInformation,getCurrentUserID,logOutAccount,isUserLoggedIn,createEmailPasswordAccount,loginEmailPasswordAccount}