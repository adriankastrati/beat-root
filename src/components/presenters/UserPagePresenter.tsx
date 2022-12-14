import UserPageView from "../views/UserPageView";
import { getCurrentUserID, getUserInformation, isUserLoggedIn, UserInformation } from "../../model/firebase/firebaseAuthenticationModel";
import { useEffect, useState } from "react";

export default function UserPagePresenter(){
    const[userInformation, setUserInformation] = useState<UserInformation>()
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


    return<div>
       {
        <UserPageView
            username = {userInformation?userInformation.username:null}
            email={userInformation?userInformation.email:null}
            id={userInformation?userInformation.authID:null}
            description={userInformation?userInformation.description:null}
        />
    }
    </div>
}