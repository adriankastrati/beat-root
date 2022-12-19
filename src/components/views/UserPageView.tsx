import { Beat } from "../../common"
import styled from "styled-components";
import MainButton, { MainButtonType } from "./common/MainButton";
import { textStyles, theme } from "../../common";
import React from "react";
import { useEffect } from "react";
import { getProfilePictures } from "model/firebase/firebaseAuthenticationModel";
import FeedPresenter from "components/presenters/FeedPresenter";
import { BlankSpace } from "./common/NavBarElements";

interface OuterBoxProps{
    frameOff?:boolean
}
const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:0px;
  
  
  @media (max-width: 869px) {
    flex-direction: column;
    align-items:center;
  }

@media (min-width: 870px) {
    flex-direction: row;
    justify-content:center;
  }
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
    border?:boolean
}
const InnerBox = styled.div<InnerBoxProps>`
  display:flex;
  border-radius: 5px;
  padding: 5px;
  text-align:center;
  flex-direction:${props=>props.flexDir};
  justify-content: center;
  align-items:center;
  width: 90%;
  height: fit-content;
  margin: 2px;
  border: ${props=>props.border?"1px solid " + theme.medium:"0px"};
  position: relative;
  
`
const BeatsContainer = styled.div`
transform: scale(1);
border-radius: 5px;
width:100%;
height:100%;
@media (max-width: 869px) {
   
  }

@media (min-width: 870px) {
    height: 71.825vh;
    overflow-y: scroll;
  }

`
const ProfilePictureContainer = styled.div`
width:128px;
min-width:128px;
height:128px;
margin: 3px;
border: 1px solid black;
border-radius: 5px;

`
interface FixedProps{
    top?:number
    bottom?:number
    left?:number
    right?:number
}
const Fixed = styled.div<FixedProps>`
${props=>props.top?"top:"+props.top+"px;":null}
${props=>props.bottom?"bottom:"+props.bottom+"px;":null}
${props=>props.right?"right:"+props.right+"px;":null}
${props=>props.left?"left:"+props.left+"px;":null}
position: fixed;
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
  align-items: center;
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
const GridRow = styled.div`
  display: grid;
  grid-template-rows: 20% 20% 20% 20% 20%;
  align-items:center;
`;

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
    imageLoadingDone:boolean
    onUpdateUserName: (username: string)=> void
    onUpdateDescription:(description:string)=>void
    setPictureMenuOpen:(state:boolean)=> void
    setDescriptionState:(state:boolean)=> void
    setImageLoadingDone:(state:boolean)=>void
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
    function GetImageCB({ img }: { img: string }) {
        const [loaded, setLoaded] = React.useState(false);
        k++;
        return (
            
          <Pad key={k}>
            {loaded ? (
              <Picture
                src={img}
                onClick={() => selectImageCB(img)}
                width={128}
                height={128}
              />
            ) : (
              <Picture height={128} width={128} src="https://firebasestorage.googleapis.com/v0/b/beat-root-a8d72.appspot.com/o/about%2FSpin-1.8s-190px.gif?alt=media&token=3b89dc77-08ec-43cc-a2ca-129904e1f740" />
            )}
            <img
              src={img}
              alt=""
              style={{ display: "none" }}
              onLoad={() => setLoaded(true)}
            />
          </Pad>
        );
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
        if (error){
            return
        }
        toggleUsernameCB()
        if (nameBoxContent === props.username){
            return;
        }
        props.onUpdateUserName(nameBoxContent)
        props.refresh()
    }

    function onUpdateDescription(){
        let error = false;
       //set rules for description
       if(descriptionBoxText === props.description){
            //dont update if the text is unchanged
            return;
        }
        if(error){
            return;
        }
        props.onUpdateDescription(descriptionBoxText)
        props.refresh()

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

    return (    <OuterBox> 
                    <InnerBox flexDir="column" border={true}>
                        <InnerBox flexDir="row">
                            {
                                props.profilePicChangingState?
                                <MainButton type = {MainButtonType.Save} scale = {0.25} fontSize={10} onClick={updateProfilePictureCB} text="" width={130}></MainButton>
                                :<MainButton type = {MainButtonType.Edit} scale = {0.25} fontSize={10} onClick={profileSelectBoxCB} text="" width={130}></MainButton>
                            }
                            <ProfilePictureContainer>                              
                                {
                                    props.profilePicChangingState?
                                    <Picture src={selectedImage}></Picture>
                                    :<Picture src={props.profilePicture?props.profilePicture:props.loadedImages[0]}></Picture>
                                }                              
                            </ProfilePictureContainer>
                            <BlankSpace width={30}></BlankSpace>
                        </InnerBox>
                        
                        {
                            props.profilePicChangingState?(<InnerBox flexDir="column">
                                                           
                                                            <SelectablePicturesContainer> 
                                                            
                                                                {props.loadedImages.map(img => (<GetImageCB img={img} />))}
                                                            </SelectablePicturesContainer>
                                                        </InnerBox>):
                                                        ""
                        }
                        
                    <InnerBox flexDir="row">
                        {
                            props.usernameChangingState?
                            (<MainButton type = {MainButtonType.Edit} text="" scale = {0.25} fontSize={10} width={130} onClick={toggleUsernameCB} ></MainButton>)
                            :
                            (<MainButton type = {MainButtonType.Save} text="" scale = {0.25} fontSize={10} width={130} onClick={updateProfileNameCB}></MainButton>)
                        } 
                        <p>Username:</p>
                        <TitleStyle>
                        {props.username? "" + props.username: "-"}
                        </TitleStyle>  
                        <BlankSpace width={30}></BlankSpace>                 
                    </InnerBox>
                    
                    {!props.usernameChangingState?
                            (<InnerBox flexDir="column">
                                <Input defaultValue={nameBoxContent} onChange={(e)=>setNameBoxContent(e.target.value)}width={"65%"} height ={"50px"}></Input>
                                <p>{nameInfoText}</p>
                            </InnerBox>):
                            (null)}
                    <InnerBox flexDir="row">  
                        {
                            props.descriptionChangingState?(<MainButton type={MainButtonType.Edit} text="" scale = {0.25} fontSize={10} width = {130} onClick={toggleDescriptionCB}></MainButton>)
                            :
                            (<MainButton type={MainButtonType.Save} text="" scale = {0.25} fontSize={10} width = {130} onClick={saveDescriptionCB}></MainButton>)
                        }   
                        <p>Description:</p><BlankSpace width={30}></BlankSpace>              
                    </InnerBox>
                    
                    {
                        props.descriptionChangingState?
                            (<InnerBox flexDir="column">
                                <DescriptionBox width="100%" height="100%"><p>{props.description?props.description:"Nothing here!"}</p></DescriptionBox>
                            </InnerBox>)
                            :
                            (<InnerBox flexDir="column">
                                <InputArea onChange={(e)=>setDescriptionBoxText(e.target.value)} width={"100%"} height = {"100px"} defaultValue={props.description!}></InputArea>    
                            </InnerBox>)
                    }
                    <TitleStyle>{props.email?"Email: " + props.email: "Email: logged out"}</TitleStyle>            
                </InnerBox>
            
                <InnerBox flexDir="column" border={true}>
                    <TitleStyle>Beats</TitleStyle>
                    <BeatsContainer>
                        <FeedPresenter userFeed={true}/>
                    </BeatsContainer>
                </InnerBox>
                
                    </OuterBox>)
}
