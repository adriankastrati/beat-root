
import styled from "styled-components";
import { theme, Track } from "../../common";
import BeatVisualisationView from "./BeatVisualisationView";
import MainButton, { MainButtonType } from "./common/MainButton";
import TrackView from "./TrackView";

interface BeatTracksViewProps {
    onAddTrack:()=>void,
    onEditTrack?:(index:number)=>void,
    tracks: Track[],
}

const AddTrackButton = styled.button``

const TracksContainer = styled.div`
    border-radius:10px;
    border: solid ${theme.dark};
    padding:10px;
`

export default function BeatTracksView(props:BeatTracksViewProps){
    return <div>
        <TracksContainer>
            {
                props.tracks.map((track, i)=><TrackView key={i} track={track} 
                onEdit={props.onEditTrack ? ()=>{props.onEditTrack!(i)} : undefined}/>)
            }
            <AddTrackButton onClick={props.onAddTrack}>+</AddTrackButton>
        </TracksContainer>
    </div>
}