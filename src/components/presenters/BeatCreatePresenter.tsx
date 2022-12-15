import { cloneDeep } from "lodash";
import { createBeat } from "../../model/firebase/firebaseBeat";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { defaultSample, Rhythm, Sample, textStyles, TextVariant, Track, theme, Beat } from "../../common";
import ModelContext from "../../contexts/ModelContext";
import BeatTracksView from "../views/BeatTracksView";
import MainButton, { MainButtonType } from "../views/common/MainButton";
import BeatVisualisationPresenter from "./BeatVisualizationPresenter";
import ColorBoxPresenter from "./ColorBoxPresenter";
import { useHistory } from "react-router";

const newTrack:Track = {
    rhythm: new Rhythm(16),
    sample: defaultSample
}

const TextTitleInput = styled.input`
    ${textStyles(TextVariant.TITLE)}
    margin:3px;
    border-radius: 6px;
    border:2px solid ${theme.medium};
    width: 100%;
    
`

const TextBodyTextArea = styled.textarea`
    ${textStyles(TextVariant.BODY)}
    margin:3px;
    height: 100px;
    width: 100%;
`
const TitleStyle = styled.div`
    font-size:18px;
    margin:0px;
`
const Justify = styled.div`
    display: flex;
    justify-content: center;
`
const Center = styled.div`
    align-items: center;
    align-self: center;
`
const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:40px;
`
const ScaledComponent = styled.div<ScaledProp>`
    width: ${props => props.amount*100}%;
`
interface ScaledProp{
    amount: number
}
const Block = styled.div`
    display: block;
    
`

enum CreationState{
    EditTheme,
    Saving,
    Main
}

export default function BeatCreatePresenter(){

    let history = useHistory()
    
    const [title, setTitle] = useState("my beat")
    const [description, setDescription] = useState("")
    const [theme, setTheme] = useState<string[]>(["#453C67", "#6D67E4", "#46C2CB", "#F2F7A1"])
    const [bpm, setBpm] = useState(120*4)
    const [tracks, setTracks] = useState<Track[]>([])

    const [creationState, SetCreationState] = useState(CreationState.Main)
    const [soundNeedsUpdate, setSoundNeedsUpdate] = useState(false)
    const {audioModel} = useContext(ModelContext)

    function play(){
        audioModel.play(tracks,bpm)
    }

    function pause(){
        audioModel.stop()
    }

    useEffect(()=>{
        if(soundNeedsUpdate){
            if (audioModel.playing){
                play()
            }
            setSoundNeedsUpdate(false)
        }
    },[soundNeedsUpdate])

    function handleAddTrack(){
        setTracks([...tracks, newTrack])
        pause()
    }

    function handleRemoveTrack(index:number){
        let newTracks = cloneDeep(tracks)
        newTracks.splice(index,1)
        setTracks(newTracks)
        pause()
    }

    function toggleEditTheme(){
        if (creationState === CreationState.EditTheme){
            SetCreationState(CreationState.Main)
        } else {
            SetCreationState(CreationState.EditTheme)
        }
    }

    function updateTrack(index:number, newTrack:Track){
        let newTracks = cloneDeep(tracks)
        newTracks[index] = newTrack
        setTracks(newTracks)
        pause()
    }

    switch (creationState) {
        case CreationState.Main:
            return <OuterBox>
            <TitleStyle>Title</TitleStyle>
            <TextTitleInput value={title} onChange={e=>setTitle(e.currentTarget.value)}/>
            <Center>
            <BeatVisualisationPresenter
                tracks={tracks}
                bpm={bpm}
                colorTheme={theme} //TODO
            />
            
            <MainButton type={MainButtonType.ChooseColorTheme} scale = {1} text = "pick color theme" onClick={toggleEditTheme}></MainButton>
            </Center>
            <TitleStyle>Tracks</TitleStyle>
            <BeatTracksView
                onAddTrack={handleAddTrack}
                tracks={tracks}
                onRemoveTrack={handleRemoveTrack}
                onSetTrack={updateTrack}
                selectableSamples={audioModel.getSamples()}
            />
            <TitleStyle>Description</TitleStyle>
            <TextBodyTextArea value={description} onChange={e=>setDescription(e.currentTarget.value)}/>
            <Center>
                <MainButton type={MainButtonType.Save}  scale = {1} text = "save and publish" 
                    onClick={()=>{
                        createBeat(
                            {
                                firestoreBeatID:"",
                                composerID:"",
                                likes:0,

                                description,
                                title,
                                bpm,
                                tracks,
                                theme,
                            }
                        ).then(()=>{history.push("/home")})

                        SetCreationState(CreationState.Saving)
                    }}
                />
            </Center>
            </OuterBox>

        case CreationState.EditTheme:
            return <ColorBoxPresenter onContinue={toggleEditTheme} onSetColorTheme={(theme:string[])=>{setTheme(theme)}}/>
        case CreationState.Saving:
            return <div>saving...</div>
    }

}
