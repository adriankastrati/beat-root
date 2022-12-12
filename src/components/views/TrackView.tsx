import { useState } from "react";
import styled from "styled-components";
import { Sample, textStyles, TextVaiant, theme, Track } from "../../common";
import DeleteCrossButton from "./common/DeleteCrossButton";
import RhythmView from "./RhythmView";

interface TrackViewProps{
    onChangePulses?: (pulses:number)=>void,
    onChangeSteps?: (steps:number)=>void,
    onChangeShift?: (steps:number)=>void,
    onChangeSample?: (sample:Sample)=>void,
    onDelete?:()=>void,
    track: Track,
    selectableSamples?: Sample[]
}

const OuterContainer = styled.div`
    background-color: ${theme.light};
    border-radius: 30px;
    margin-top:10px;
    padding:10px;
`

const SampleSelect = styled.select`
    ${textStyles(TextVaiant.SUBTITLE)}
`

const SampleDiv = styled.div`
    ${textStyles(TextVaiant.SUBTITLE)}
`

export default function TrackView(props:TrackViewProps){
    return <OuterContainer>
        {   //sample
            props.onChangeSample && props.selectableSamples ? 
            <SampleSelect onChange={e=>props.onChangeSample!(e.currentTarget.value)}>
                {
                    props.selectableSamples.map((sample, i) => <option key={i} value={sample}>{sample}</option>)
                }
            </SampleSelect> : 
            <SampleDiv>{props.track.sample}</SampleDiv>
        }

        {   //delete
            props.onDelete ? <DeleteCrossButton onClick={props.onDelete}/> : null
        }

        <RhythmView
            rhythm={props.track.rhythm} 
            onChangePulses={props.onChangePulses}
            onChangeShift={props.onChangeShift}
            onChangeSteps={props.onChangeSteps}
        />
    </OuterContainer>
}