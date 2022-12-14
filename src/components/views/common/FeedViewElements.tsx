import styled from "styled-components";
import { textStyles, theme } from "../../../common";

export const BeatParent = styled.div`
display:flex;
transform: scale(0.85);
flex-direction:column;
align-items: center;
margin:0px;
padding-top: 50px;
padding-left: 30px;
padding-right: 30px;
position: relative;
width: 300px;
border: 1px solid ${theme.medium};
border-radius:20px;
height: 430px;
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
    width: 100%;
    height: 100%;
    position:sticky;
    left:5px;
    padding: 10px;
`;
