import { type } from "@testing-library/user-event/dist/type";
import colorpalette from "../../../icons/colorpalette.svg"
import edit from "../../../icons/edit.svg"
import add from "../../../icons/add.svg"
import styled from "styled-components";
import save from "../../../icons/save.svg"

import emptyHeart from "../../../icons/emptyHeart.svg"
import filledHeart from "../../../icons/filledHeart.svg"

import copy from "../../../icons/copy.svg"
import burger from "../../../icons/burger.svg"
import cross from "../../../icons/cross.svg"
import play from "../../../icons/play.svg"
import pause from "../../../icons/pause.svg"
import refresh from "../../../icons/refresh.svg"

//NOTE: of course this should have been refactored into separate components.. 
// It is only kept this way because it works prioritised some other issue.

interface ButtonInterface{
    width: number
    scale: number
    backgroundColor?:string
    frameOff?:boolean
    borderRad?:number
    padding?:number
}

const ButtonStyle = styled.button<ButtonInterface>`  
display: flex;
align-items: center;
justify-content: center;
margin: auto;
width: ${props => props.width *props.scale}px;
border: ${props => props.frameOff? 0 : 1}px solid rgb(155, 155, 155); 
border-radius: ${props=>props.borderRad?props.borderRad:5}px;
background-color: ${props=>props.backgroundColor? props.backgroundColor:"rgb(255, 255, 255)"}; 
padding: ${props=>props.padding?props.padding:10}px; 
margin: ${props => 5*props.scale}px;
font-size: ${props => 22*props.scale}px; 
cursor: pointer; /* Mouse pointer on hover */ 
`


const ButtonImg = styled.img`
max-width: 30px;
max-height: 30px;
`
interface ButtonTextProps{
    fontSize?:number
}
const ButtonText = styled.div<ButtonTextProps>`
font-size:${props=>props.fontSize?props.fontSize:16}px;
`

export enum MainButtonType{
    Edit,
    Create,
    ChooseColorTheme,
    Save,
    Add,
    NotLiked,
    Liked,
    Copy,
    Burger,
    Cross,
    Plain,
    Play,
    Pause,
    Refresh
}

interface Props{
    type: MainButtonType
    text?: string
    onClick: any
    scale?: number
    width?: number
    frameOff?:boolean
    backgroundColor?:string
    borderRad?:number
    fontSize?:number
}

function MainButton(props: Props){

    let icon:string = "";
    let btnWidth = 100;
    
    switch(props.type){
        case MainButtonType.Edit:
            icon = edit;
            btnWidth = 100;
            break;
        case MainButtonType.ChooseColorTheme:
            icon = colorpalette;
            btnWidth = 220;
            break;
        case MainButtonType.Create:
            icon = add;
            btnWidth = 180;
            break;
        case MainButtonType.Save:
            icon = save;
            btnWidth = 220;
            break;
        case MainButtonType.Plain:
            btnWidth = props.text?props.text.length*16:16;
            break;
        case MainButtonType.NotLiked:
            icon = emptyHeart;
            btnWidth = 50 + (props.text?props.text.length*16:0);
            break;
        case MainButtonType.Liked:
            icon = filledHeart;
            btnWidth = 50 + (props.text?props.text.length*16:0);
            break;
        case MainButtonType.Copy:
            btnWidth = 50;
            icon = copy;
            break;
        case MainButtonType.Burger:
            btnWidth = 50;
            icon = burger;
            break;
        case MainButtonType.Cross:
            btnWidth = 50;
            icon = cross;
            break;
        case MainButtonType.Play:
            btnWidth = 50;
            icon=play;
            break;
        case MainButtonType.Pause:
            btnWidth = 50;
            icon= pause;
            break;
        case MainButtonType.Refresh:
            btnWidth = 50;
            icon = refresh;
            break;
    }
    if(props.type != MainButtonType.Plain){
        return (<div>
                    <ButtonStyle scale = {props.scale?props.scale:1} width = {props.width ? props.width : btnWidth} onClick={props.onClick} frameOff={props.frameOff} backgroundColor = {props.backgroundColor} borderRad={props.borderRad}>
                        <ButtonImg src={icon}></ButtonImg>
                        {
                            props.text?<ButtonText fontSize={props.fontSize}>{props.text}</ButtonText>:null
                        }
                    </ButtonStyle>
                </div>)
    }else{
        return (<div>
                    <ButtonStyle scale = {props.scale?props.scale:1} width = {props.width ? props.width : btnWidth} onClick={props.onClick} borderRad={props.borderRad}>
                        {
                            props.text?<ButtonText fontSize={props.fontSize}>{props.text}</ButtonText>:null
                        }
                    </ButtonStyle>
                </div>)
            
    }
}
export default MainButton;