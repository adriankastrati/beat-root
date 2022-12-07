
import styled from "styled-components";
import { theme, Track } from "../../common";
import TrackView from "./TrackView";
import MainButton, { MainButtonType } from "../views/common/MainButton";

interface BeatTracksViewProps {
    onAddTrack:()=>void,
    onEditTrack?:(index:number)=>void,
    tracks: Track[],
}

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
            <MainButton text = "+" type = {MainButtonType.Plain} scale = {1} onClick={props.onAddTrack} width = {35}></MainButton>
        </TracksContainer>
    </div>
}