import { cloneDeep } from "lodash";
import { useContext, useState } from "react";
import styled from "styled-components";
import { Beat, defaultSample, playTracks, Rhythm, Sample, textStyles, TextVariant, Track, theme } from "../../common";
import ModelContext from "../../contexts/ModelContext";
import BeatTracksView from "../views/BeatTracksView";
import BeatVisualisationView from "../views/BeatVisualisationView";
import EditThemeModalView from "../views/EditThemeModalView";
import EditTrackModalView from "../views/EditTrackModalView";
import MainButton, { MainButtonType } from "../views/common/MainButton";
import { withRouter, RouteComponentProps, Route } from "react-router-dom";



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

function BeatCreatePresenter(props:RouteComponentProps){
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

    const [playing, setPlaying] = useState(false)

    const {audioModel} = useContext(ModelContext)

    function play(){
        setPlaying(true)
        playTracks(beatCreationState.tracks, beatCreationState.cpm, audioModel)
    }

    function pause(){
        setPlaying(false)
        audioModel.stop()
    }

    function updateSound(){ //TODO useEffect for needing update instead
        if (playing){
            play()
        }
    }

    function handleSetTitle(title:string){
        setBeatCreationState(
            {...beatCreationState, title}
        )
    }

    function handleAddTrack(){
        setBeatCreationState(
            {...beatCreationState, tracks:[...beatCreationState.tracks, newTrack]} 
        )
        updateSound() 
    }

    function handleRemoveTrack(index:number){
        let newTracks = beatCreationState.tracks
        newTracks.splice(index,1)
        setBeatCreationState(
            {...beatCreationState, tracks:newTracks} 
        )
        updateSound()
    }

    function handleEditTrack(index:number){
        setEditTrackModal(index)
        updateSound()
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
        updateSound()
    }
    function redirectColorBox(){
        props.history.push('/play/create/colorbox');
    }
    

    if (editTrackModal != null){
        return <EditTrackModalView 
            track={beatCreationState.tracks[editTrackModal]} 
            onAddGlyph={(glyph:number)=>{
                let newTrack = cloneDeep(beatCreationState.tracks[editTrackModal])
                newTrack.rhythm.addGlyph(glyph)
                updateTrack(newTrack, editTrackModal)
            }}
            onRemoveGlyph={(glyph:number)=>{
                let newTrack = cloneDeep(beatCreationState.tracks[editTrackModal])
                newTrack.rhythm.removeGlyph(glyph)
                updateTrack(newTrack, editTrackModal)
            }}
            onSampleSelect={(sample:Sample)=>{
                let newTrack = cloneDeep(beatCreationState.tracks[editTrackModal])
                newTrack.sample = sample
                updateTrack(newTrack, editTrackModal)
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
        return <OuterBox>
            
            <Justify>
                <ScaledComponent amount={0.8}>
                <TitleStyle>Title</TitleStyle>
                <TextTitleInput value={beatCreationState.title} onChange={e=>handleSetTitle(e.currentTarget.value)}/>
                </ScaledComponent>
            </Justify>     
            
            <Center>
            <BeatVisualisationView
                onPlay={()=>play()}
                onPause={()=>pause()}
                rhythms={beatCreationState.tracks.map(({rhythm})=>rhythm)}
                currentProgress={0}//TODO
                amplitude={0}//TODO
            />
            
            <MainButton type={MainButtonType.ChooseColorTheme} scale = {1} text = "pick color theme" onClick={redirectColorBox}></MainButton>
            </Center>
            <Justify>
                <ScaledComponent amount={0.7}>                
                    <TitleStyle>Tracks</TitleStyle>
                    <Justify>
                        <BeatTracksView
                        onAddTrack={handleAddTrack}
                        onEditTrack={handleEditTrack}
                        tracks={beatCreationState.tracks}
                        onRemoveTrack={handleRemoveTrack}/>  
                    </Justify>        
                </ScaledComponent>
            </Justify>
            <Justify>
                <ScaledComponent amount={0.7}>
                    <TitleStyle>Description</TitleStyle>
                    <Justify>
                        <TextBodyTextArea value={beatCreationState.description} onChange={e=>handleSetDescription(e.currentTarget.value)}/>
                    </Justify>
                </ScaledComponent>
            </Justify>
            
            <Center>
                <MainButton type={MainButtonType.Save}  scale = {1} text = "save and publish" onClick={console.log("save!")}></MainButton>
            </Center>
        </OuterBox>
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
export default withRouter(BeatCreatePresenter);