import { Rhythm } from "../../common";
import BeatVisualisationPresenter from "../presenters/BeatVisualizationPresenter";
import RhythmView from "./RhythmView";

//TODO rewrite this whole thing

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