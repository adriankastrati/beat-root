import { cloneDeep } from "lodash";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Beat, defaultSample, playTracks, Rhythm, Sample, textStyles, TextVaiant, Track, theme } from "../../common";
import ModelContext from "../../contexts/ModelContext";
import BeatTracksView from "../views/BeatTracksView";
import BeatVisualisationView from "../views/BeatVisualisationView";
import EditThemeModalView from "../views/EditThemeModalView";
import MainButton, { MainButtonType } from "../views/common/MainButton";

const newTrack:Track = {
    rhythm: new Rhythm(16),
    sample: defaultSample
}

const TextTitleInput = styled.input`
    ${textStyles(TextVaiant.TITLE)}
    margin:3px;
    border-radius: 6px;
    border:2px solid ${theme.medium};
    
`

const TextBodyTextArea = styled.textarea`
    ${textStyles(TextVaiant.BODY)}
    margin:3px;
`
const TitleStyle = styled.div`
    font-size:18px;
    margin:0px;
`
const Center = styled.div`
align-items: center;
align-self: center;
margin: 0 auto;
`

const ColorPreviewBox = styled.div`
  display:flex;
  border: 20px solid white;
  width: 256px;
  height: 256px;
`
const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:40px;
`

export default function BeatCreatePresenter(){
    
    const [title, setTitle] = useState("my beat")
    const [description, setDescription] = useState("")
    const [theme, setTheme] = useState<string[]>([])
    const [cpm, setCpm] = useState(20)
    const [tracks, setTracks] = useState<Track[]>([])

    const [editThemeModal, setEditThemeModal] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [soundNeedsUpdate, setSoundNeedsUpdate] = useState(false)
    const {audioModel} = useContext(ModelContext)

    function play(){
        setPlaying(true)
        playTracks(tracks, cpm, audioModel)
    }

    function pause(){
        setPlaying(false)
        audioModel.stop()
    }

    function updateSound(){ //TODO useEffect for needing update instead
        setSoundNeedsUpdate(true)
    }

    useEffect(()=>{
        if(soundNeedsUpdate){
            if (playing){
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
            <BeatVisualisationView
                onPlay={()=>play()}
                onPause={()=>pause()}
                rhythms={tracks.map(({rhythm})=>rhythm)}
                currentProgress={0}//TODO
                amplitude={0}//TODO
            />
            <button onClick={()=>updateSound()}>update</button>
            
            <MainButton type={MainButtonType.ChooseColorTheme} scale = {1} text = "pick color theme" onClick={console.log("clicked")}></MainButton>
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