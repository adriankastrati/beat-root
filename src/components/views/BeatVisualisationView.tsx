import { Rhythm } from "../../common";

interface BeatVisualisationViewProps{
    rhythms: Rhythm[]
    currentProgress:number,
    amplitude:number
}
export default function BeatVisualisationView(props:BeatVisualisationViewProps){
    return <div>
        Visualisation
    </div>
}