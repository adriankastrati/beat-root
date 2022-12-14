import { cloneDeep } from "lodash";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Beat, defaultSample, Rhythm, Sample, textStyles, TextVariant, Track, theme } from "../../common";
import ModelContext from "../../contexts/ModelContext";
import BeatTracksView from "../views/BeatTracksView";
import EditThemeModalView from "../views/EditThemeModalView";
import MainButton, { MainButtonType } from "../views/common/MainButton";
import BeatVisualisationPresenter from "./BeatVisualizationPresenter";

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

export default function BeatCreatePresenter(){
    
    const [title, setTitle] = useState("my beat")
    const [description, setDescription] = useState("")
    const [theme, setTheme] = useState<string[]>([])
    const [bpm, setBpm] = useState(120)
    const [tracks, setTracks] = useState<Track[]>([])

    const [editThemeModal, setEditThemeModal] = useState(false)
    const [soundNeedsUpdate, setSoundNeedsUpdate] = useState(false)
    const {audioModel} = useContext(ModelContext)

    function play(){
        audioModel.play(tracks,bpm)
    }

    function pause(){
        audioModel.stop()
    }

    function updateSound(){ //TODO useEffect for needing update instead
        setSoundNeedsUpdate(true)
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
        updateSound()
    }

    function handleRemoveTrack(index:number){
        let newTracks = cloneDeep(tracks)
        newTracks.splice(index,1)
        setTracks(newTracks)
        updateSound()
    }

    function handleEditTheme(){
        setEditThemeModal(true)
    }

    function updateTrack(index:number, newTrack:Track){
        let newTracks = cloneDeep(tracks)
        newTracks[index] = newTrack
        setTracks(newTracks)
        updateSound()
    }
    

    if (editThemeModal){
        return <EditThemeModalView 
            theme={theme} 
            onUpdate={setTheme}
            onExit={()=>{setEditThemeModal(false)}}
        />
    } else {
        return <OuterBox>
            <TitleStyle>Title</TitleStyle>
            <TextTitleInput value={title} onChange={e=>setTitle(e.currentTarget.value)}/>
            <Center>
            <BeatVisualisationPresenter
                tracks={tracks}
                bpm={bpm}
            />
            <button onClick={()=>updateSound()}>update</button>
            
            <MainButton type={MainButtonType.ChooseColorTheme} scale = {1} text = "pick color theme" onClick={()=>{}}></MainButton>
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
            <Center><MainButton type={MainButtonType.Save}  scale = {1} text = "save and publish" onClick={console.log("save!")}></MainButton></Center>
        </OuterBox>
    }
}
