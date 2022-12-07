import { Rhythm } from "../../common";
import BeatVisualisationView from "./BeatVisualisationView";
import RhythmView from "./RhythmView";
import GlyphComponent from "./common/GlyphComponent";

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
        <BeatVisualisationView 
            rhythms={props.rhythmsAndSampleNames.map(({rhythm})=>rhythm)} 
            currentProgress={props.currentProgress} 
            amplitude={props.amplitude}
            onPause={props.onStop}
            onPlay={props.onPlay}
            />

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