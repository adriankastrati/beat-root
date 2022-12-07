import styled from "styled-components";
import { theme } from "../../../common";
import DeleteCrossButton from "./DeleteCrossButton";

interface GlyphComponentProps{
    number: number,
    onDelete?: ()=>void
}

const GlyphContainer = styled.div`
    background-color: ${theme.white};
    border-radius: 10px;
    width:60px;
    height:60px;
    margin:10px;
    padding:5px;
`

export default function GlyphComponent(props: GlyphComponentProps){
    return <GlyphContainer>
        {
            props.onDelete ? <DeleteCrossButton onClick={props.onDelete}/> : null
        }
        
        {props.number}
    </GlyphContainer>
}