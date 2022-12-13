import { type } from "@testing-library/user-event/dist/type";
import colorpalette from "../../../icons/colorpalette.svg"
import edit from "../../../icons/edit.svg"
import add from "../../../icons/add.svg"
import styled from "styled-components";
import save from "../../../icons/save.svg"
import like from "../../../icons/heart.svg"
import copy from "../../../icons/copy.svg"
import burger from "../../../icons/burger.svg"
import cross from "../../../icons/cross.svg"
import { isPropertySignature } from "typescript";

interface ButtonInterface{
    width: number
    scale: number
    backgroundColor?:string
    frameOff?:boolean
}

const ButtonStyle = styled.button<ButtonInterface>`  display:inline-flex;
width: ${props => props.width *props.scale}px;
height: ${props => props.scale}%;
text-align: center;
align-items: center;
background-color: ${props=>props.backgroundColor? props.backgroundColor:"rgb(255, 255, 255)"}; 
border: ${props => props.frameOff? 0 : 1}px solid rgb(155, 155, 155); 
height: fit-content;
border-radius: 5px;
color: rgb(0, 0, 0); 
padding: ${props => 10*props.scale}px; 
font-size: ${props => 22*props.scale}px; 
cursor: pointer; /* Mouse pointer on hover */ 
margin: ${props => 10*props.scale}px;

`

const ButtonImg = styled.img`
max-width: 30px;
max-height: 30px;
`

export enum MainButtonType{
    Edit,
    Create,
    ChooseColorTheme,
    Save,
    Add,
    Like,
    Copy,
    Burger,
    Cross,
    Plain
}

interface Props{
    type: MainButtonType
    text: string
    onClick: any
    scale: number
    width?: number
    frameOff?:boolean
    backgroundColor?:string
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
            btnWidth = props.text.length*16;
            break;
        case MainButtonType.Like:
            icon = like;
            btnWidth = 50 + props.text.length*16;
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
    }
    if(props.type != MainButtonType.Plain){
        return (
                    <ButtonStyle scale = {props.scale} width = {props.width ? props.width : btnWidth} onClick={props.onClick} frameOff={props.frameOff} backgroundColor = {props.backgroundColor}>
                        <ButtonImg src={icon}></ButtonImg>
                        {props.text}
                    </ButtonStyle>
                )
    }else{
        return (
                    <ButtonStyle scale = {props.scale} width = {props.width ? props.width : btnWidth} onClick={props.onClick}>
                    {props.text}
                    </ButtonStyle>
                )
            
    }
}
export default MainButton;