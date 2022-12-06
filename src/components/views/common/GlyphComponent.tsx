import styled from "styled-components";
import { theme } from "../../../common";

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

const DeleteButton = styled.button`
    background-color: ${theme.dark};
`

export default function GlyphComponent(props: GlyphComponentProps){
    return <GlyphContainer>
        {
            props.onDelete ? <DeleteButton onClick={props.onDelete}>x</DeleteButton> : null
        }
        
        {props.number}
    </GlyphContainer>
}