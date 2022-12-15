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
const DescriptionBox = styled.div<SizeProps>`
width:${props=>props.width};
height: ${props=>props.height};
text-align: center;
  margin:5px;
  padding: 10px;
  border: 1px solid ${theme.light}
`
interface SizeProps{
    width:string
    height:string
}
const Input = styled.input<SizeProps>`
  width:${props=>props.width};
  height: ${props=>props.height};
  font-size: 22px;
`
const InputArea = styled.textarea<SizeProps>`
  width:${props=>props.width};
  height: ${props=>props.height};
  font-size: 22px;
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
    profilePicChangingState:boolean
    editingDescription:boolean
    loadedImages: string[]
    onUpdateUserName: (username: string)=> void
    onUpdateDescription:(description:string)=>void
    setPictureMenuOpen:(state:boolean)=> void
    setDescriptionState:(state:boolean)=> void
    onUpdateProfilePicture: (profilePicture: string)=> void
    refresh:()=>void
}
let nameInstructions = 'Choose a name between 5-20 characters'
export default function UserPageView(props: UserPageProps){
    const [selectedImage, setSelectedImage] = React.useState<string>('');
    const [nameBoxContent, setNameBoxContent] = React.useState<string>('')
    const [nameInfoText, setNameInfoText] = React.useState<string>(nameInstructions)
    const [descriptionBoxText, setDescriptionBoxText] = React.useState<string>(props.description?props.description:"Nothing here!")
    

    let k = 0; 
    function getImageCB(img:string){
        k++;
        return (<Pad key = {k}>
                <Picture src={img} onClick={()=> selectImageCB(img)} width={128} height={128}></Picture>
            </Pad>)
    }
    
    function profileSelectBoxCB(){
        props.setPictureMenuOpen(!props.profilePicChangingState)
        setSelectedImage(props.profilePicture?props.profilePicture:props.loadedImages[0]);
    }
    function updateProfilePictureCB(){
        let pic = selectedImage
        props.onUpdateProfilePicture(pic)
        profileSelectBoxCB()
        props.refresh()
    }
    function selectImageCB(img:string){
        setSelectedImage(img)
    }
    function updateProfileNameCB(){
        if(!nameBoxContent){
            return;
        }
        let error = false;
        if(nameBoxContent.length < 5){
            displayErrorMsg('Too few characters!')
            error = true;
        }else if (nameBoxContent.length>20){
            displayErrorMsg('Too many characters!')
            error = true;
        }// set other naming rules

        if (error){
            return
        }
        props.refresh()
        props.onUpdateUserName(nameBoxContent)
    }

    function onUpdateDescription(){
        //set rules for description
        props.refresh()
        props.onUpdateDescription(descriptionBoxText)
    }
    function displayErrorMsg(msg:string){
        setNameInfoText(msg)
        setTimeout(()=>{
            setNameInfoText(nameInstructions)
        }, 5000)//display error msg for 5 secs and revert to showing instructions
    }
    function toggleDescriptionCB(){
        props.setDescriptionState(!props.editingDescription)
    }
    function saveDescriptionCB(){
        toggleDescriptionCB()
        onUpdateDescription()
    }

    return (<div>
                <OuterBox>
                <InnerBox>
                        
                        <ProfilePictureContainer>
                            {
                                props.profilePicChangingState?<Picture src={selectedImage}></Picture>:(
                                    <Picture src={props.profilePicture?props.profilePicture:props.loadedImages[0]}></Picture>
                                    )
                            }         
                        </ProfilePictureContainer>
                    
                        {
                        props.profilePicChangingState?
                        <MainButton type = {MainButtonType.Save} scale = {0.5} onClick={updateProfilePictureCB} text="Save" width={130}></MainButton>
                        :<MainButton type = {MainButtonType.Edit} scale = {0.5} onClick={profileSelectBoxCB} text="Edit" width={130}></MainButton>
                    }
                    
                    {
                        props.profilePicChangingState?
                        <SelectablePicturesContainer> {/*some better way (map?) to list images maybe*/}
                            {props.loadedImages.map(getImageCB)}
                        </SelectablePicturesContainer>:
                        ""
                    }
                    
                </InnerBox>

                    <InnerBox>
                        <TitleStyle>
                            {props.username? "Username: " + props.username: "Username has not been set!"}
                        </TitleStyle>
                        <Input onChange={(e)=>setNameBoxContent(e.target.value)}width={"30%"} height ={"50px"}></Input>
                        <MainButton type = {MainButtonType.Plain} text="Set Name" scale = {0.5} width={122} onClick={updateProfileNameCB}></MainButton>
                        <p>{nameInfoText}</p>
                    </InnerBox>
                    <div>{}</div>
                    <InnerBox>
                        
                        <p>Description:</p>
                        {
                            props.editingDescription?(<InnerBox>
                                                    <DescriptionBox width="100%" height="100px"><p>{props.description?props.description:"Nothing here!"}</p></DescriptionBox>
                                                    <MainButton type={MainButtonType.Edit} text="Edit" scale = {0.5} width = {130} onClick={toggleDescriptionCB}></MainButton>
                                                </InnerBox>
                            )
                            :
                            (<InnerBox>
                                <InputArea onChange={(e)=>setDescriptionBoxText(e.target.value)} width={"100%"} height = {"100px"} defaultValue={props.description!}></InputArea>
                                <MainButton type={MainButtonType.Save} text="Save" scale = {0.5} width = {130} onClick={saveDescriptionCB}></MainButton>  
                            </InnerBox>
                            )
                        }
                        
                    </InnerBox>
                    <TitleStyle>{props.email?"Email: " + props.email: "Email: logged out"}</TitleStyle>            
                    
                    <InnerBox>
                        <TitleStyle>
                            {props.id?"ID: "+props.id:"ID: ?"}
                        </TitleStyle>
                    </InnerBox>
                </OuterBox>
            </div>)
}