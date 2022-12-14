import UserPageView from "../views/UserPageView";
import { getCurrentUserID, getProfilePictures, getUserInformation, isUserLoggedIn, setProfilePicture, setUsername, UserInformation } from "../../model/firebase/firebaseAuthenticationModel";
import { useEffect, useState } from "react";

export default function UserPagePresenter(){
    const[userInformation, setUserInformation] = useState<UserInformation>()
    const[profileChange, setProfileChange] = useState<string>()
    

    useEffect(()=>{
        isUserLoggedIn().then(log =>{
            if(log){
                getCurrentUserID().then(async userID =>{
                getUserInformation(userID).then(userInformation=>{
                    
                    setUserInformation(userInformation)
                }).catch(e=>{
                    console.log(e)
                })
                }).catch(e=>{
                    console.log(e)
                })
            }
        })
        }
    , [])

    async function changeUsername(username: string){
        return setUsername(username).then(acheived=>{
            if (acheived)
                setProfileChange("Completed")
            else
                setProfileChange("Failed")
        })
    }

    async function changePicture(pictureLink: string){
        console.log(pictureLink)

        return setProfilePicture(pictureLink).then(acheived=>{
            if (acheived)
                setProfileChange("Completed")
            else
                setProfileChange("Failed")
        })
    }

    return<div>
       {
        <UserPageView
            onUpdateUserName = {changeUsername}
            onUpdateProfilePicture={changePicture}
            username = {userInformation?userInformation.username:null}
            email={userInformation?userInformation.email:null}
            id={userInformation?userInformation.authID:null}
            description={userInformation?userInformation.description:null}
            profilePicture={userInformation?userInformation.profilePictureURL:null}
            
        />
    }
    </div>
}