import { type } from "@testing-library/user-event/dist/type";
import colorpalette from "../../../icons/colorpalette.svg"
import edit from "../../../icons/edit.svg"
import add from "../../../icons/add.svg"
import styled from "styled-components";
import save from "../../../icons/save.svg"
import { isPropertySignature } from "typescript";

interface ButtonInterface{
    width: number
    scale: number
}

const ButtonStyle = styled.button<ButtonInterface>`  display:inline-flex;
width: ${props => props.width *props.scale}px;
height: ${props => props.scale}%;
text-align: center;
align-items: center;
background-color: rgb(255, 255, 255); 
border: 1px solid rgb(155, 155, 155); 
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
    Plain
}

interface Props{
    type: MainButtonType
    text: string
    onClick: any
    scale: number
    width?: number
}

function MainButton(props: Props){

    let icon:string = "";
    let btnWidth = 100;
    
    switch(props.type){
        case MainButtonType.Edit:
            icon = edit
            btnWidth = 100;
            break;
        case MainButtonType.ChooseColorTheme:
            icon = colorpalette
            btnWidth = 220;
            break;
        case MainButtonType.Create:
            icon = add
            btnWidth = 100;
            break;
        case MainButtonType.Save:
            icon = save
            btnWidth = 180;
            break;
        case MainButtonType.Plain:
            btnWidth = props.text.length*16;
            break;
    }
    if(props.type != MainButtonType.Plain){
        return (
                    <ButtonStyle scale = {props.scale} width = {props.width ? props.width : btnWidth} onClick={props.onClick}>
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