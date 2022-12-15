import UserPageView from "../views/UserPageView";
import { getCurrentUserID, getProfilePictures, getUserInformation, isUserLoggedIn, setProfilePicture, setUsername, setDescription, UserInformation } from "../../model/firebase/firebaseAuthenticationModel";
import { useEffect, useState } from "react";

export default function UserPagePresenter(){
    const[userInformation, setUserInformation] = useState<UserInformation>()
    const[profileChange, setProfileChange] = useState<string>()
    const [profilePicChangingState, setPictureMenuOpen] = useState<boolean>(false)
    const [editingDescription, setDescriptionState] = useState<boolean>(true)
    const [loadedImages, setLoadedImages] =  useState<string[]>([]);
    const [, refresh] = useState(({}))

    useEffect(()=>{refreshCB()}, [])
    useEffect(() => {
        async function getImages() {
          const imagePromise: Promise<string[]> = getProfilePictures();
          const images: string[] = await imagePromise.then((value) => value);
          setLoadedImages(images);
        }
    
        getImages();
      }, []);
    function fetchUser(){
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

    async function changeUsername(username: string){
        return setUsername(username).then(acheived=>{
            if (acheived)
                setProfileChange("Completed")
            else
                setProfileChange("Failed")
        })
    }
    async function changeDescription(description:string){
        return setDescription(description).then(acheived=>{
            if (acheived)
                setProfileChange("Completed")
            else
                setProfileChange("Failed")
        })
    }

    async function changePicture(pictureLink: string){
        return setProfilePicture(pictureLink).then(acheived=>{
            if (acheived)
                setProfileChange("Completed")
            else
                setProfileChange("Failed")
        })
    }
    useEffect(setInitialProfilePic,[])

    function setInitialProfilePic(){
        if(!userInformation?.profilePictureURL){
            changePicture(loadedImages[0])
        }
    }
    function refreshCB(){
        fetchUser()
        refresh(new Object)
    }

    return<div>
       {
        <UserPageView
            onUpdateUserName = {changeUsername}
            onUpdateProfilePicture={changePicture}
            onUpdateDescription={changeDescription}
            username = {userInformation?userInformation.username:null}
            email={userInformation?userInformation.email:null}
            id={userInformation?userInformation.authID:null}
            description={userInformation?userInformation.description:null}
            editingDescription={editingDescription}
            setDescriptionState={setDescriptionState}
            profilePicture={userInformation?userInformation.profilePictureURL:null}
            setPictureMenuOpen={setPictureMenuOpen}
            loadedImages={loadedImages}
            profilePicChangingState={profilePicChangingState}
            refresh = {refreshCB}
            
        />
    }
    </div>
}