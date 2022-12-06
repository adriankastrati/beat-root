import { Rhythm } from "../../common";

interface BeatVisualisationViewProps{
    onPlay:()=>void,
    onPause:()=>void,
    rhythms: Rhythm[],
    currentProgress:number,
    amplitude:number,
}
export default function BeatVisualisationView(props:BeatVisualisationViewProps){
    return <div>
        <button onClick={props.onPlay}>play</button>
        <button onClick={props.onPause}>pause</button>
    </div>
}