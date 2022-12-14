import { cloneDeep } from "lodash";
import { createBeat } from "../../model/firebase/firebaseBeat";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { defaultSample, Rhythm, textStyles, TextVariant, Track, theme } from "../../common";
import ModelContext from "../../contexts/ModelContext";
import BeatTracksView from "../views/BeatTracksView";
import MainButton, { MainButtonType } from "../views/common/MainButton";
import BeatVisualisationPresenter from "./BeatVisualizationPresenter";
import ColorBoxPresenter from "./ColorBoxPresenter";
import { useHistory } from "react-router";
import { BeatParent } from "components/views/common/FeedViewElements";
import { BlankSpace } from "components/views/common/NavBarElements";

const newTrack:Track = {
    rhythm: new Rhythm(8),
    sample: defaultSample
}

const TextTitleInput = styled.input`
    ${textStyles(TextVariant.TITLE)}
    margin:3px;
    border-radius: 6px;
    border:2px solid ${theme.medium};
    width: 90%;
    
`

const TextBodyTextArea = styled.textarea`
    ${textStyles(TextVariant.BODY)}
    margin:3px;
    height: 100px;
    width: 104%;
    border-color:${theme.medium};
    border-radius:10px;
    margin:0px;
    resize:none;
`
const TitleStyle = styled.div`
    font-size:18px;
    margin:10px;
`
const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:30px;
  
  
  @media (max-width: 869px) {
    flex-direction: column;
    align-items:center;
  }

@media (min-width: 870px) {
    flex-direction: row;
    justify-content:center;
  }
`
const InnerBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: fit-content;
margin: 0px;
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
    const [tracks, setTracks] = useState<Track[]>([newTrack])

    const [creationState, SetCreationState] = useState(CreationState.Main)
    const {audioModel} = useContext(ModelContext)

    function pause(){
        audioModel.stop()
    }

    // useEffect(()=>{
    //     if(soundNeedsUpdate){
    //         if (audioModel.playingID !== null){ //?
    //             play()
    //         }
    //         setSoundNeedsUpdate(false)
    //     }
    // },[soundNeedsUpdate])

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
                        <InnerBox>
                            <BeatParent>
                                <TextTitleInput value={title} onChange={e=>setTitle(e.currentTarget.value)}/>
                                <BeatVisualisationPresenter
                                    tracks={tracks}
                                    bpm={bpm}
                                    colorTheme={theme} //TODO
                                />

                            </BeatParent> 
                            <MainButton type={MainButtonType.ChooseColorTheme} scale = {1} text = "pick color theme" onClick={toggleEditTheme}></MainButton>
                            <div>
                            slow
                            <input type="range" min={100} max={8*120} value={bpm} 
                            onChange={e=>{
                                pause()
                                setBpm(+e.currentTarget.value)
                            }}
                            />
                            fast
                            </div>
                        </InnerBox>
                        <InnerBox>
                            <InnerBox>
                                <TitleStyle>Tracks</TitleStyle>
                                <BeatTracksView
                                    onAddTrack={handleAddTrack}
                                    tracks={tracks}
                                    onRemoveTrack={handleRemoveTrack}
                                    onSetTrack={updateTrack}
                                    selectableSamples={audioModel.getSamples()}
                                />
                            </InnerBox>
                            <InnerBox>
                                <TitleStyle>Description</TitleStyle>
                                <TextBodyTextArea value={description} onChange={e=>setDescription(e.currentTarget.value)}/>
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
                                            ).then(()=>{history.push("/play/explore")})

                                            SetCreationState(CreationState.Saving)
                                            pause()
                                        }}
                                    />
                                </InnerBox>
                        </InnerBox>
                    </OuterBox>

        case CreationState.EditTheme:
            return <ColorBoxPresenter onContinue={toggleEditTheme} onSetColorTheme={(theme:string[])=>{setTheme(theme)}}/>
        case CreationState.Saving:
            return <div>saving...</div>
    }

}
