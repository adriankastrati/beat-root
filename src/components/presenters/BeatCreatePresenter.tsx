import { useState } from "react";
import { Beat, defaultSample, Rhythm, Track } from "../../common";
import BeatCreateView from "../views/BeatCreateView";
import Modal from "../views/common/Modal";
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
            onUpdate={(track) => updateTrack(track, editTrackModal)}
            onExit={()=>{setEditTrackModal(null)}}
        />
    } else if (editThemeModal){ 
        return <EditThemeModalView 
            theme={beatCreationState.theme} 
            onUpdate={(theme) => setBeatCreationState({...beatCreationState, theme})}
            onExit={()=>{setEditThemeModal(false)}}
        />
    } else {
        return <BeatCreateView
            onSetTitle={handleSetTitle}
            onAddTrack={handleAddTrack}
            onEditTrack={handleEditTrack}
            onEditTheme={handleEditTheme}
            onSetDescription={handleSetDescription}
            onSetCpm={handleSetCpm}
            title={beatCreationState.title}
            colorTheme={beatCreationState.theme}
            tracks={beatCreationState.tracks}
            description={beatCreationState.description}
            cpm = {beatCreationState.cpm}
            amplitude={0} //TODO
            currentProgress={0} //TODO
        />
    }

    
}