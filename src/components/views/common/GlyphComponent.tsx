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
    width:36px;
    height:36px;
    margin:10px;
    padding:5px;
`

const Center = styled.div`
align-items: center;
text-align: center;
font-weight: bold;
font-size: 24px;
`


export default function GlyphComponent(props: GlyphComponentProps){
    return (
        
            <GlyphContainer>
                <Center>
                    {props.number}
                </Center>
                {
                    props.onDelete ? <DeleteCrossButton onClick={props.onDelete}>x</DeleteCrossButton> : null
                }
            </GlyphContainer>
            )
}