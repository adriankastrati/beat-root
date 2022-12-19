import UserPageView from "../views/UserPageView";
import { getCurrentUserID, getProfilePictures, getUserInformation, isUserLoggedIn, setProfilePicture, setUsername, setDescription, UserInformation, removeUsername, switchUsername } from "../../model/firebase/firebaseAuthenticationModel";
import { useEffect, useState } from "react";
import { userInfo } from "os";

export default function UserPagePresenter(){
    const[userInformation, setUserInformation] = useState<UserInformation>()
    const[profileChangeMessage, setProfileChangeMessage] = useState<string>()
    const [profilePicChangingState, setPictureMenuOpen] = useState<boolean>(false)
    const [descriptionChangingState, setDescriptionChangingState] = useState<boolean>(true)
    const [usernameChangingState, setUsernameChangingState] = useState<boolean>(true)
    const [loadedImages, setLoadedImages] =  useState<string[]>([]);
    const [imageLoadingDone, setImageLoadingDone] = useState<boolean>(false)
    const [, refresh] = useState(({}))

    useEffect(()=>{refreshCB()}, [])

    useEffect(() => {
        async function getImages() {
          const imagePromise: Promise<string[]> = getProfilePictures();
          const images: string[] = await imagePromise.then((value) => value);
          setLoadedImages(images);
        }
    
        getImages();
        fetchUser()

      }, []);

    function fetchUser(){
        isUserLoggedIn().then(log =>{
            if(log){
                getCurrentUserID().then(async userID =>{
                if (userID)
                   { getUserInformation(userID).then(userInformation=>{
                    setUserInformation(userInformation)
                }).catch(e=>{
                    console.log(e)
                })}
                }).catch(e=>{
                    console.log(e)
                })
            }
        })
    }

    async function changeUsername(newUsername: string){
        
        if(userInformation){
            let b = switchUsername(newUsername).catch(()=>{
                setProfileChangeMessage("Failed, try again")
            })
            console.log(await b)

        }else{
            setProfileChangeMessage("Not logged in")
        }
        
    }
    async function changeDescription(description:string){
        return setDescription(description).then(acheived=>{
            if (acheived)
            setProfileChangeMessage("Completed")
            else{
                setProfileChangeMessage("Failed")
            }
        })

    }

    async function changePicture(pictureLink: string){
        return setProfilePicture(pictureLink).then(acheived=>{
            if (acheived)
            setProfileChangeMessage("Completed")
            else
            setProfileChangeMessage("Failed")
        })
    }
    function refreshCB(){
        setTimeout(( )=>{
            fetchUser();
            refresh(new Object)},
        100)
        
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
            descriptionChangingState={descriptionChangingState}
            setDescriptionState={setDescriptionChangingState}
            profilePicture={userInformation?userInformation.profilePictureURL:null}
            setPictureMenuOpen={setPictureMenuOpen}
            loadedImages={loadedImages}
            profilePicChangingState={profilePicChangingState}
            setUsernameChangingState={setUsernameChangingState}
            refresh = {refreshCB}
            usernameChangingState={usernameChangingState}
            imageLoadingDone = {imageLoadingDone}
            setImageLoadingDone = {setImageLoadingDone}
            
        />
    }
    </div>
}