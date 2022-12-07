
import styled from "styled-components";
import { theme, Track } from "../../common";
import BeatVisualisationView from "./BeatVisualisationView";
import MainButton, { MainButtonType } from "../../common/MainButton";
import TrackView from "./TrackView";

interface BeatTracksViewProps {
    onAddTrack:()=>void,
    onEditTrack?:(index:number)=>void,
    tracks: Track[],
}

const AddTrackButton = styled.button`
text-align: center;
align-items: center;
background-color: rgb(255, 255, 255); 
border: 1px solid rgb(155, 155, 155); 
height: fit-content;
border-radius: 5px;
color: rgb(0, 0, 0); 
padding: 12px; 
font-size: 22px; 
cursor: pointer; /* Mouse pointer on hover */ 
width: 50px;
`

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