import { Beat } from "../../common"
import styled from "styled-components";
import MainButton, { MainButtonType } from "./common/MainButton";
import { textStyles, theme } from "../../common";
import React from "react";
import { useEffect } from "react";
import { getProfilePictures } from "model/firebase/firebaseAuthenticationModel";

interface BlankSpaceProps{
    width:number
    height:number
}
const BlankSpace = styled.div<BlankSpaceProps>`
height:${props=>props.height}px;
width:${props=>props.width}px;
`
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
interface InnerBoxProps{
    flexDir:string
}
const InnerBox = styled.div<InnerBoxProps>`
  display:flex;
  flex-direction:${props=>props.flexDir};
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
    descriptionChangingState:boolean
    usernameChangingState:boolean
    loadedImages: string[]
    onUpdateUserName: (username: string)=> void
    onUpdateDescription:(description:string)=>void
    setPictureMenuOpen:(state:boolean)=> void
    setDescriptionState:(state:boolean)=> void
    setUsernameChangingState:(state:boolean)=>void
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
        if(pic != props.profilePicture){
            props.onUpdateProfilePicture(pic)
        }
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
        toggleUsernameCB()
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
        props.setDescriptionState(!props.descriptionChangingState)
    }
    function saveDescriptionCB(){
        toggleDescriptionCB()
        onUpdateDescription()
    }
    function toggleUsernameCB(){
        setNameBoxContent(props.username?props.username:"")
        props.setUsernameChangingState(!props.usernameChangingState)
    }

    return (<div>
                <OuterBox>
                <InnerBox flexDir="row">

                    {
                        props.profilePicChangingState?
                        <MainButton type = {MainButtonType.Save} scale = {0.5} onClick={updateProfilePictureCB} text="Save" width={130}></MainButton>
                        :<MainButton type = {MainButtonType.Edit} scale = {0.5} onClick={profileSelectBoxCB} text="Edit" width={130}></MainButton>
                    }
                        
                    <ProfilePictureContainer>
                        {
                            props.profilePicChangingState?<Picture src={selectedImage}></Picture>:(
                                <Picture src={props.profilePicture?props.profilePicture:props.loadedImages[0]}></Picture>
                                )
                        }         
                    </ProfilePictureContainer>
                    <BlankSpace width={45} height={50}></BlankSpace>
                </InnerBox>
                {
                        props.profilePicChangingState?(<InnerBox flexDir="column">
                                                            <SelectablePicturesContainer> {/*some better way (map?) to list images maybe*/}
                                                                {props.loadedImages.map(getImageCB)}
                                                            </SelectablePicturesContainer>
                                                        </InnerBox>):
                        ""
                    }

                    <InnerBox flexDir="row">
                    {
                            props.usernameChangingState?(
                                    <InnerBox flexDir="column">
                                        <MainButton type = {MainButtonType.Edit} text="Edit" scale = {0.5} width={130} onClick={toggleUsernameCB}></MainButton>
                                    </InnerBox>
                                ):(
                                    <InnerBox flexDir="column">
                                        <MainButton type = {MainButtonType.Save} text="Save" scale = {0.5} width={130} onClick={updateProfileNameCB}></MainButton>
                                    </InnerBox>
                                )
                        }
                        <p>Username:</p>
                        <TitleStyle>
                            {props.username? "" + props.username: "-"}
                        </TitleStyle>
                        <BlankSpace width={50} height={50}></BlankSpace>
                        </InnerBox>
                        {!props.usernameChangingState?
                        (<InnerBox flexDir="column">
                            <Input defaultValue={nameBoxContent} onChange={(e)=>setNameBoxContent(e.target.value)}width={"65%"} height ={"50px"}></Input>
                            <p>{nameInfoText}</p>
                        </InnerBox>):
                        (<InnerBox flexDir="column">

                        </InnerBox>)}
                    
                    <div>{}</div>
                    <InnerBox flexDir="row">
                        {
                            props.descriptionChangingState?(<InnerBox flexDir="column">
                                                                <MainButton type={MainButtonType.Edit} text="Edit" scale = {0.5} width = {130} onClick={toggleDescriptionCB}></MainButton>
                                                            </InnerBox>
                            )
                            :
                            (<InnerBox flexDir="column">
                                <MainButton type={MainButtonType.Save} text="Save" scale = {0.5} width = {130} onClick={saveDescriptionCB}></MainButton>  
                            </InnerBox>
                            )
                        }    
                        <p>Description:</p>  
                        <BlankSpace width={50} height={50}></BlankSpace>                  
                    </InnerBox>
                    {
                        props.descriptionChangingState?(<InnerBox flexDir="column">
                                                            <DescriptionBox width="100%" height="100px"><p>{props.description?props.description:"Nothing here!"}</p></DescriptionBox>
                                                        </InnerBox>):
                                                        (<InnerBox flexDir="column">
                                                            <InputArea onChange={(e)=>setDescriptionBoxText(e.target.value)} width={"100%"} height = {"100px"} defaultValue={props.description!}></InputArea>    
                                                        </InnerBox>)
                    }

                    <TitleStyle>{props.email?"Email: " + props.email: "Email: logged out"}</TitleStyle>            
                    
                    <InnerBox flexDir="column">
                        <TitleStyle>
                            {props.id?"ID: "+props.id:"ID: ?"}
                        </TitleStyle>
                    </InnerBox>
                </OuterBox>
            </div>)
}