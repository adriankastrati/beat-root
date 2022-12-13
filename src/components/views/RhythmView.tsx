import styled from "styled-components";
import { MAX_STEPS, Rhythm, textStyles, TextVariant } from "../../common";

interface RhythmViewProps{
    rhythm: Rhythm
    onChangePulses?: (pulses:number)=>void,
    onChangeSteps?: (steps:number)=>void,
    onChangeShift?: (steps:number)=>void,
}

const Select = styled.select`
`

const NumberBox = styled.span`
    ${textStyles(TextVariant.BODY)}
    margin: 20px;
`

export default function RhythmView(props:RhythmViewProps){
    return <div>
        {
            //Steps
            <NumberBox>
            {props.onChangeSteps ? 
            <Select onChange={e=>props.onChangeSteps!(+e.currentTarget.value)} value={props.rhythm.steps}>
                {Array(MAX_STEPS).fill(0).map((_,i)=>i+1).map((n, i)=><option value={n} key={i} >{n}</option>)}
            </Select> : props.rhythm.steps}
            </NumberBox>
        }

        {
            //Pulses
            <NumberBox>
            {props.onChangePulses ? 
            <Select onChange={e=>props.onChangePulses!(+e.currentTarget.value)} value={props.rhythm.pulses}>
                {props.rhythm.getPossibleEventNumbers().map((n, i)=><option value={n} key={i} >{n}</option>)}
            </Select> : props.rhythm.pulses}
            </NumberBox>
        }

        {
            //Shift
            <NumberBox>
            {props.onChangeShift ? 
            <Select onChange={e=>props.onChangeShift!(+e.currentTarget.value)} value={props.rhythm.shift}>
                {Array(props.rhythm.steps).fill(0).map((_, i)=><option value={i} key={i} >{i}</option>)}
            </Select> : props.rhythm.shift}
            </NumberBox>
        }
        
        </div>
}