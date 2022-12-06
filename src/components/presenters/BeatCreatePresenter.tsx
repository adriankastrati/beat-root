import { cloneDeep } from "lodash";
import { useContext, useState } from "react";
import styled from "styled-components";
import { Beat, defaultSample, playTracks, Rhythm, Sample, textStyles, TextVaiant, Track } from "../../common";
import ModelContext from "../../contexts/ModelContext";
import BeatTracksView from "../views/BeatTracksView";
import BeatVisualisationView from "../views/BeatVisualisationView";
import EditThemeModalView from "../views/EditThemeModalView";
import EditTrackModalView from "../views/EditTrackModalView";


interface BeatCreationState{
    title: string,
    description: string,
    theme: string[],
    tracks: Track[],
    cpm:number
}

const newTrack:Track = {
    rhythm: new Rhythm([1]),
    sample: defaultSample
}

const TextTitleInput = styled.input`
    ${textStyles(TextVaiant.TITLE)}
`

const TextBodyTextArea = styled.textarea`
    ${textStyles(TextVaiant.BODY)}
`

export default function BeatCreatePresenter(){
    const [beatCreationState, setBeatCreationState] = useState<BeatCreationState>(
        {
            title:"my beat",
            description:"",
            theme:[],
            tracks:[],
            cpm:20
        }
    )

    const [editTrackModal, setEditTrackModal] = useState<number|null>(null)
    const [editThemeModal, setEditThemeModal] = useState(false)

    const {audioModel} = useContext(ModelContext);

    function handleSetTitle(title:string){
        setBeatCreationState(
            {...beatCreationState, title}
        )
    }

    function handleAddTrack(){
        setBeatCreationState(
            {...beatCreationState, tracks:[...beatCreationState.tracks, newTrack]} 
        )
    }

    function handleEditTrack(index:number){
        setEditTrackModal(index)
    }

    function handleEditTheme(){
        setEditThemeModal(true)
    }

    function handleSetDescription(description:string){
        setBeatCreationState(
            {...beatCreationState, description}
        )
    }
    function handleSetCpm(cpm:number){
        setBeatCreationState(
            {...beatCreationState, cpm}
        )
    }

    function updateTrack(track:Track, index:number){
        let newState = {...beatCreationState}
        newState.tracks[index] = track;
        setBeatCreationState(newState)
    }

    if (editTrackModal != null){
        return <EditTrackModalView 
            track={beatCreationState.tracks[editTrackModal]} 
            onAddGlyph={(glyph:number)=>{
                let newTrack = cloneDeep(beatCreationState.tracks[editTrackModal])
                newTrack.rhythm.addGlyph(glyph)
                updateTrack(newTrack, editTrackModal)
                playTracks(beatCreationState.tracks, beatCreationState.cpm, audioModel) //TODO: fix this
            }}
            onRemoveGlyph={(glyph:number)=>{
                let newTrack = cloneDeep(beatCreationState.tracks[editTrackModal])
                newTrack.rhythm.removeGlyph(glyph)
                updateTrack(newTrack, editTrackModal)
                playTracks(beatCreationState.tracks, beatCreationState.cpm, audioModel) //TODO: fix this
            }}
            onSampleSelect={(sample:Sample)=>{
                let newTrack = cloneDeep(beatCreationState.tracks[editTrackModal])
                newTrack.sample = sample
                updateTrack(newTrack, editTrackModal)
                playTracks(beatCreationState.tracks, beatCreationState.cpm, audioModel) //TODO: fix this
            }}
            onExit={()=>{setEditTrackModal(null)}}
            samples={provisionalSamples}
        />
    } else if (editThemeModal){ 
        return <EditThemeModalView 
            theme={beatCreationState.theme} 
            onUpdate={(theme) => setBeatCreationState({...beatCreationState, theme})}
            onExit={()=>{setEditThemeModal(false)}}
        />
    } else {
        return <div>
            <div>title</div>
            <TextTitleInput value={beatCreationState.title} onChange={e=>handleSetTitle(e.currentTarget.value)}/>
            <BeatVisualisationView
                onPlay={()=>playTracks(beatCreationState.tracks, beatCreationState.cpm, audioModel)}
                onPause={()=>audioModel.stop()}
                rhythms={beatCreationState.tracks.map(({rhythm})=>rhythm)}
                currentProgress={0}//TODO
                amplitude={0}//TODO
            />
            <div>tracks</div>
            <BeatTracksView
                onAddTrack={handleAddTrack}
                onEditTrack={handleEditTrack}
                tracks={beatCreationState.tracks}
            />
            <TextBodyTextArea value={beatCreationState.description} onChange={e=>handleSetDescription(e.currentTarget.value)}/>
        </div>
    }
}

//TODO: Remove for real database samples
const provisionalSamples = [
    defaultSample,
    {name:"techno-hihat", url:"https://tonejs.github.io/audio/drum-samples/Techno/hihat.mp3"} as Sample,
    {name:"techno-kick", url:"https://tonejs.github.io/audio/drum-samples/Techno/kick.mp3"} as Sample,
    {name:"techno-tom2", url:"https://tonejs.github.io/audio/drum-samples/Techno/tom2.mp3"} as Sample,
    {name:"bongo", url:"https://tonejs.github.io/audio/drum-samples/Bongos/tom1.mp3"} as Sample,
    {name:"tom", url:"https://tonejs.github.io/audio/drum-samples/LINN/tom1.mp3"} as Sample

]