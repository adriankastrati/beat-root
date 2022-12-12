import { Rhythm } from "../../common";
import MainButton, { MainButtonType } from "../views/common/MainButton";
import image from '../../placeholder.png'
import styled from "styled-components";

interface BeatVisualisationViewProps{
    onPlay:()=>void,
    onPause:()=>void,
    rhythms: Rhythm[],
    currentProgress:number,
    amplitude:number,
}
const Center = styled.div`
align-self: center;
align-items: center;
`
const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
`

export default function BeatVisualisationView(props:BeatVisualisationViewProps){
    return <OuterBox>
        <Center>
            <img src={image} style={{width:"200px", margin:"0px"}}></img>
        </Center>
        <Center>
            <MainButton type={MainButtonType.Plain} text="play" scale = {1} onClick={props.onPlay}></MainButton>
            <MainButton type={MainButtonType.Plain} text="pause" scale = {1} onClick={props.onPause}></MainButton>
        </Center>
    </OuterBox>
}