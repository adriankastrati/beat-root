
import styled from "styled-components";
import { Rhythm, Sample, theme, Track } from "../../common";
import TrackView from "./TrackView";
import MainButton, { MainButtonType } from "../views/common/MainButton";
import { cloneDeep, sample } from "lodash";

interface BeatTracksViewProps {
    onAddTrack?:()=>void,
    onRemoveTrack?:(index:number)=>void,
    onSetTrack?:(index:number, newTrack:Track)=>void,
    tracks: Track[],
    selectableSamples?: Sample[]
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
    function handleChangePulses(index:number, pulses:number){
        let newTrack = cloneDeep(props.tracks[index])
        newTrack.rhythm.pulses = pulses
        props.onSetTrack!(index, newTrack)
    }

    function handleChangeSteps(index:number, steps:number){
        let newTrack = cloneDeep(props.tracks[index])
        newTrack.rhythm = new Rhythm(steps)
        props.onSetTrack!(index, newTrack)
    }

    function handleChangeShift(index:number, shift:number){
        let newTrack = cloneDeep(props.tracks[index])
        newTrack.rhythm.shift = shift
        props.onSetTrack!(index, newTrack)
    }

    function handleChangeSample(index:number, sample:Sample){
        let newTrack = cloneDeep(props.tracks[index])
        newTrack.sample = sample
        props.onSetTrack!(index, newTrack)
    }

    return <div>
        <TracksContainer>
            {
                props.tracks.map((track, i)=>
                    <TrackView 
                    key={i} 
                    track={track} 
                    onDelete={props.onRemoveTrack ? ()=>props.onRemoveTrack!(i) : undefined}
                    onChangePulses={ props.onSetTrack ? (pulses:number) => handleChangePulses(i,pulses) : undefined}
                    onChangeSample={ props.onSetTrack ? (sample:Sample) => handleChangeSample(i,sample) : undefined}
                    onChangeSteps={ props.onSetTrack ? (steps:number) => handleChangeSteps(i,steps) : undefined}
                    onChangeShift={ props.onSetTrack ? (shift:number) => handleChangeShift(i,shift) : undefined}
                    selectableSamples={props.selectableSamples}
                />)
            }
            <Center>
                {
                    props.tracks.length < 5 ? 
                    <MainButton text = "add sample" type = {MainButtonType.Create} scale = {0.75} onClick={props.onAddTrack}></MainButton>
                    : null

                }

            </Center>
        </TracksContainer>
    ) 
    </div>
}