import { Rhythm } from "../../common";
import BeatVisualisationView from "./BeatVisualisationView";
import RhythmView from "./RhythmView";

interface BeatDetailViewProps{
    onPlay:()=>void,
    onStop:()=>void,
    onClickCreator:()=>void,
    onLike:()=>void,
    title:string,
    decription:string,
    rhythmsAndSampleNames: {rhythm:Rhythm, sampleName:string}[],
    currentProgress:number,
    amplitude:number,
}

export default function BeatDetailView(props:BeatDetailViewProps) {
    return <div>
        <div>{props.title}</div>
        <button onClick={props.onPlay}>play</button>
        <button onClick={props.onStop}>stop</button>
        <BeatVisualisationView 
            rhythms={props.rhythmsAndSampleNames.map(({rhythm})=>rhythm)} 
            currentProgress={props.currentProgress} 
            amplitude={props.amplitude}/>

        <div>
            tracks:
            {   //render rythms
                props.rhythmsAndSampleNames.map(({rhythm, sampleName}, i)=> <li key={i}>
                    {sampleName}
                    <RhythmView rhythm={rhythm}/>
                    </li>)
            }
        </div>
        
    </div>
}