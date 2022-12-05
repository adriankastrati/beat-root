
import styled from "styled-components";
import { theme, Track } from "../../common";
import BeatVisualisationView from "./BeatVisualisationView";
import MainButton, { MainButtonType } from "./common/MainButton";
import TrackView from "./TrackView";

interface BeatCreateViewProps {
    onSetTitle: (title:string)=>void,
    onAddTrack:()=>void,
    onSetDescription:(description:string)=>void,
    onSetCpm: (cpm:number)=>void,
    onEditTrack:(index:number)=>void,
    onEditTheme:()=>void,
    title:string,
    colorTheme:string[],
    tracks: Track[],
    description: string,
    amplitude: number,
    currentProgress: number
    cpm:number
}

const AddTrackButton = styled.button``

const TracksContainer = styled.div`
    border-radius:10px;
    border: solid ${theme.dark};
    padding:10px;
`

export default function BeatCreateView(props:BeatCreateViewProps){
    return <div>
        <div>Title</div>
        <input value={props.title} onInput={(e) => props.onSetTitle(e.currentTarget.value)}></input>
        <BeatVisualisationView
            rhythms={props.tracks.map(({rhythm})=>rhythm)}
            amplitude={props.amplitude}
            currentProgress={props.currentProgress}
        />
        <MainButton type={MainButtonType.ChooseColorTheme} text={"pick color theme"}/>
        <div>Tracks</div>
        <TracksContainer>
            {
                props.tracks.map((track, i)=><TrackView key={i} track={track} onEdit={()=>{props.onEditTrack(i)}}/>)
            }
            <AddTrackButton onClick={props.onAddTrack}>+</AddTrackButton>
        </TracksContainer>
    </div>
}