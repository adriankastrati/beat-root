import { Beat } from "../../common"
import styled from "styled-components";
import MainButton, { MainButtonType } from "./common/MainButton";
import { textStyles, theme } from "../../common";
import React from "react";
import { useEffect } from "react";
import { getProfilePictures } from "model/firebase/firebaseAuthenticationModel";


const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:40px;
  padding: 10px;
  border: 1px solid ${theme.medium}
`
const DescriptionBox = styled.div`
  display:flex;
  flex-direction:column;
  width: 80%;
  margin:5px;
  padding: 10px;
  border: 1px solid ${theme.medium}
`

const Input = styled.input`
  width:100%;
  @media (min-width: 475px) {
    width: 350px;
  }
  @media (max-width: 290px) {
    width: 120px;
  }
`
const InnerBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  margin:2px;
  padding: 5px;
`

const ProfilePictureContainer = styled.div`
width:128px;
height:128px;
margin: 10px;
border: 1px solid black;
border-radius: 5px;
`
interface PictureProps{
    width?:number
    height?:number
}
const Picture = styled.img<PictureProps>`
  width:${props=> props.width?props.width:"100%"};
  height:${props=> props.height?props.height:"100%"};

`

const SelectablePicturesContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  width: 90%;
  padding: 10px;
  border: 2px solid ${theme.medium};
  overflow-x: scroll;
`
const Pad = styled.div`
padding: 10px;
`
const TitleStyle = styled.div`
  font-size:18px;
  margin:10px;
  text-align: center;
`
interface UserPageProps{
    username: string|null
    email: string|null
    id: string|null
    description: string|null
    profilePicture?: string|null
    onUpdateUserName: (username: string)=> void
    onUpdateProfilePicture: (profilePicture: string)=> void
}

export default function UserPageView(props: UserPageProps){
    const [profilePicChangingState, setPictureMenuOpen] = React.useState<boolean>(false)
    const [loadedImages, setLoadedImages] =  React.useState<string[]>([]);
    const [selectedImage, setSelectedImage] = React.useState<string>(props.profilePicture?props.profilePicture:loadedImages[0]);
    
    let k = 0; 


    function getImageCB(img:string){
        k++;
        return (<Pad key = {k}>
                <Picture src={img} onClick={()=> selectImageCB(img)} width={128} height={128}></Picture>
            </Pad>)
    }
    React.useEffect(() => {
        async function getImages() {
          const imagePromise: Promise<string[]> = getProfilePictures();
          const images: string[] = await imagePromise.then((value) => value);
          setLoadedImages(images);
        }
    
        getImages();
      }, []);
    useEffect(setInitialProfilePic,[])

    function setInitialProfilePic(){
        if(!props.profilePicture){
            props.onUpdateProfilePicture(loadedImages[0])
            console.log("set profile pic to standard pic")
        }
    }
    function profileSelectBoxCB(){
        setPictureMenuOpen(!profilePicChangingState)
        setSelectedImage(props.profilePicture?props.profilePicture:loadedImages[0]);
    }
    function updateProfilePicture(){
        let pic = selectedImage;
        props.onUpdateProfilePicture(pic)
        profileSelectBoxCB();
        console.log("updated picture")
    }
    function selectImageCB(img:string){
        setSelectedImage(img)
    }

    return (<div>
                <OuterBox>
                    <InnerBox>
                        <TitleStyle>
                            {props.username? "Username: " + props.username: "Username has not been set!"}
                        </TitleStyle>
                    </InnerBox>
                    <div>{}</div>
                    <InnerBox>
                        <p>Description:</p>
                        <DescriptionBox>
                            {"hej123"+ props.description}
                        </DescriptionBox>
                    </InnerBox>
                    <TitleStyle>{props.email?"Email: " + props.email: "Email: logged out"}</TitleStyle>
                    <InnerBox>
                        
                            <ProfilePictureContainer>
                                {
                                    profilePicChangingState?<Picture src={selectedImage}></Picture>:(
                                        <Picture src={props.profilePicture!}></Picture>
                                        )
                                }         
                            </ProfilePictureContainer>
                        
                            {
                            profilePicChangingState?
                            <MainButton type = {MainButtonType.Save} scale = {0.65} onClick={updateProfilePicture} text="Save Picture" width={195}></MainButton>
                            :<MainButton type = {MainButtonType.Edit} scale = {0.65} onClick={profileSelectBoxCB} text="Edit Picture" width={190}></MainButton>
                        }
                        
                        {
                            profilePicChangingState?
                            <SelectablePicturesContainer> {/*some better way (map?) to list images maybe*/}
                                {loadedImages.map(getImageCB)}
                            </SelectablePicturesContainer>:
                            ""
                        }
                        
                    </InnerBox>

                    
                    
                    <InnerBox>
                        <TitleStyle>
                            {props.id?"ID: "+props.id:"ID: ?"}
                        </TitleStyle>
                    </InnerBox>
                </OuterBox>
            </div>)
}