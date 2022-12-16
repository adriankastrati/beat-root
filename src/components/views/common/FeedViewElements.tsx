import styled from "styled-components";
import { textStyles, theme } from "../../../common";

export const BeatParent = styled.div`
display:flex;
transform: scale(0.85);
flex-direction:column;
align-items: center;
margin:0px;
padding: 30px;
position: relative;
width: 300px;
border: 1px solid ${theme.medium};
border-radius:20px;
`;
interface UserTitleProps{
    offset:number
}

export const UserTitle = styled.div<UserTitleProps>`
display:flex;
flex-direction: column;
position:absolute;
right: ${props=>props.offset+5}px;
top: 5px;
font-weight:bold;
margin: 10px;
`

export const BeatTitle = styled.div`
display:flex;
flex-direction: column;
position:absolute;
font-weight: bold;
left: 5px;
top: 5px;
margin: 10px;
`;
export const ThemedCard = styled.div`
display:flex;
flex-direction:column;
margin:00px;
padding: 00px;
border: 1px solid ${theme.medium}
`;
export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 5px;
    left: 0px;
    padding: 10px;
`;