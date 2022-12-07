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
align-items: center;
align-self: center;
margin: 0 auto;
`

export default function BeatVisualisationView(props:BeatVisualisationViewProps){
    return <div>
        <Center>
            <img src={image} style={{width:"200px", margin:"0px"}}></img>
        </Center>
        <MainButton type={MainButtonType.Plain} text="play" scale = {1} onClick={props.onPlay}></MainButton>
        <MainButton type={MainButtonType.Plain} text="pause" scale = {1} onClick={props.onPause}></MainButton>
    </div>
}