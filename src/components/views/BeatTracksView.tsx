
import styled from "styled-components";
import { theme, Track } from "../../common";
import TrackView from "./TrackView";
import MainButton, { MainButtonType } from "../views/common/MainButton";

interface BeatTracksViewProps {
    onAddTrack?:()=>void,
    onRemoveTrack?:(index:number)=>void,
    onEditTrack?:(index:number)=>void,
    tracks: Track[],
}

const TracksContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius:10px;
    border: solid ${theme.dark};
    padding:10px;
    width: 100%;
`
const Center = styled.div`
align-items: center;
align-self: center;
margin: 0 auto;
`

export default function BeatTracksView(props:BeatTracksViewProps){
    return (        
        <TracksContainer>
            {
                props.tracks.map((track, i)=><TrackView key={i} track={track} 
                onEdit={props.onEditTrack ? ()=>{props.onEditTrack!(i)} : undefined}
                onDelete={props.onRemoveTrack ? ()=>props.onRemoveTrack!(i) : undefined}
                />)
            }
            <Center>
                <MainButton text = "add sample" type = {MainButtonType.Create} scale = {0.75} onClick={props.onAddTrack}></MainButton>

            </Center>
        </TracksContainer>
    )
}