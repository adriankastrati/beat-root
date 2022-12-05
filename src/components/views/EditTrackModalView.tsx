import { Track } from "../../common";

interface EditTrackModalViewProps{
    track:Track,
    onUpdate: (track:Track)=>void,
    onExit: ()=>void
}
export default function EditTrackModalView(props:EditTrackModalViewProps){
    return <div>Edit track modal</div>
}