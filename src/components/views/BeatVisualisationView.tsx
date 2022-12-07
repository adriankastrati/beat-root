import { Rhythm } from "../../common";
import MainButton, { MainButtonType } from "../views/common/MainButton";

interface BeatVisualisationViewProps{
    onPlay:()=>void,
    onPause:()=>void,
    rhythms: Rhythm[],
    currentProgress:number,
    amplitude:number,
}
export default function BeatVisualisationView(props:BeatVisualisationViewProps){
    return <div>
        <MainButton type={MainButtonType.Plain} text="play" scale = {1} onClick={props.onPlay}></MainButton>
        <MainButton type={MainButtonType.Plain} text="pause" scale = {1} onClick={props.onPause}></MainButton>
    </div>
}