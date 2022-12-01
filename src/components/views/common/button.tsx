import { type } from "@testing-library/user-event/dist/type";
import colorpalette from "./icons/colorpalette.svg"
import edit from "./icons/edit.svg"
import add from "./icons/add.svg"
import './App.css';
export enum MainButtonType{
    Edit,
    Create,
    ChooseColorTheme
}

interface Props{
    type: MainButtonType
    text: string
}

function MainButton(props: Props){

    let icon:string = "";
    let id = ""
    
    switch(props.type){
        case MainButtonType.Edit:
            icon = edit
            id ="editBtn"
            break;
        case MainButtonType.ChooseColorTheme:
            icon = colorpalette
            id = "colorBtn"
            break;
        case MainButtonType.Create:
            icon = add
            id = "createBtn"
            break;
    }

    return (<button id = {id} type = "button" className="button"><img className="btnIcon" src={icon}></img>
        {props.text}
        </button>)
}
export default MainButton;