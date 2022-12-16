import { useState } from "react";
import styled from "styled-components";
import { Sample, textStyles, TextVariant, theme, Track } from "../../common";
import DeleteCrossButton from "./common/DeleteCrossButton";
import MainButton, { MainButtonType } from "./common/MainButton";
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

const OuterBox = styled.div`
    background-color: ${theme.light};
    border-radius: 10px;
    align-items:center;
    width:90%;
    margin-top:10px;
    padding:10px;
    position: relative;
`
const Fixed = styled.div`
    display:flex;
    flex-direction: column;
    position:absolute;
    top:-15px;
    right: -15px;
`
const Innerbox = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`
const SampleSelect = styled.select`
    ${textStyles(TextVariant.SUBTITLE)}
    width: 85%;
    const Select = styled.select;
    direction: ltr;
    border-radius: 5px;
    border:none;
`

const SampleDiv = styled.div`
    ${textStyles(TextVariant.SUBTITLE)}
`

export default function TrackView(props:TrackViewProps){
    return (         
                <OuterBox>
                    <Fixed>
                    {   //delete
                        props.onDelete ? <MainButton onClick={props.onDelete} type={MainButtonType.Cross} scale={0.75} text="" backgroundColor={theme.medium} frameOff={true} borderRad={20}/>: null
                    }
                    </Fixed>
                    <Innerbox>
                    {   //sample
                        props.onChangeSample && props.selectableSamples ? 
                        <SampleSelect onChange={e=>props.onChangeSample!(e.currentTarget.value)} value={props.track.sample}>
                            {
                                props.selectableSamples.map((sample, i) => <option key={i} value={sample}>{sample}</option>)
                            }
                        </SampleSelect> : 
                        <SampleDiv>{props.track.sample}</SampleDiv>
                    }

                    

                    <RhythmView
                        rhythm={props.track.rhythm} 
                        onChangePulses={props.onChangePulses}
                        onChangeShift={props.onChangeShift}
                        onChangeSteps={props.onChangeSteps}
                    />
                    </Innerbox>
                </OuterBox>
    )
}