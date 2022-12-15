import styled from "styled-components";
import { MAX_STEPS, Rhythm, textStyles, TextVariant } from "../../common";

interface RhythmViewProps{
    rhythm: Rhythm
    onChangePulses?: (pulses:number)=>void,
    onChangeSteps?: (steps:number)=>void,
    onChangeShift?: (steps:number)=>void,
}

const Select = styled.select`
direction: ltr;
border-radius: 5px;
border:none;
font-style:italic;
width: 70px;
font-size:20px;
`

const NumberBox = styled.span`
    ${textStyles(TextVariant.BODY)}
    display: flex;
    flex-direction: column;
    margin-left: calc(1vw + 1vh);
    margin-right: calc(1vw + 1vh);
    font-size: 16px;
    
`
const OuterBox = styled.div`
display: flex;
padding: 0px;
flex-direction: rows;
justify-content: space-betwenn;
`

export default function RhythmView(props:RhythmViewProps){
    return <OuterBox>
        
            <NumberBox>
                <p>Steps</p>
            {props.onChangeSteps ? 
            <Select onChange={e=>props.onChangeSteps!(+e.currentTarget.value)} value={props.rhythm.steps}>
                {Array(MAX_STEPS).fill(0).map((_,i)=>i+1).map((n, i)=><option value={n} key={i} >{n}</option>)}
            </Select> : props.rhythm.steps}
            </NumberBox>

            <NumberBox>
                <p>Pulses</p>
            {props.onChangePulses ? 
            <Select onChange={e=>props.onChangePulses!(+e.currentTarget.value)} value={props.rhythm.pulses}>
                {props.rhythm.getPossibleEventNumbers().map((n, i)=><option value={n} key={i} >{n}</option>)}
            </Select> : props.rhythm.pulses}
            </NumberBox>

            <NumberBox>
                <p>Shift</p>
            {props.onChangeShift ? 
            <Select onChange={e=>props.onChangeShift!(+e.currentTarget.value)} value={props.rhythm.shift}>
                {Array(props.rhythm.steps).fill(0).map((_, i)=><option value={i} key={i} >{i}</option>)}
            </Select> : props.rhythm.shift}
            </NumberBox>
        
        </OuterBox>
}