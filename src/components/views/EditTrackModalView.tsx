import styled from "styled-components";
import { Sample, theme, Track } from "../../common";
import GlyphComponent from "./common/GlyphComponent";

interface EditTrackModalViewProps{
    track:Track,
    samples:Sample[],
    onAddGlyph: (glyph:number)=>void,
    onRemoveGlyph: (glyph:number)=>void,
    onSampleSelect: (sample:Sample)=>void,
    onExit: ()=>void
}

const RhythmContainer = styled.div`
    background-color: ${theme.light};
    margin:20px;
    padding:10px;
    border-radius:10px;
`

const Container = styled.div`
    background-color: ${theme.white};
    margin:20px;
    padding:10px;
    border-radius:10px;
`

const AddGlyphSelect = styled.select`
    background-color: ${theme.white};
    border-radius: 10px;
    width:60px;
    height:60px;
    margin:10px;
    padding:5px;
`

const SampleSelect = styled.select`
`

export default function EditTrackModalView(props:EditTrackModalViewProps){
    return <Container>
        sample
        <SampleSelect onChange={e=>{props.onSampleSelect(props.samples[+e.currentTarget.value])}}>
            <option>Select Sample</option>
            {props.samples.map((sample, i) => <option key={i} value={i}>
                {sample.name}
            </option>)
            }
        </SampleSelect>

        <RhythmContainer>
            {props.track.rhythm.getGlyphs().map((glyph, i)=>
                <GlyphComponent key={i} number={glyph} onDelete={()=>props.onRemoveGlyph(glyph)}/>)
            }
            <AddGlyphSelect onChange={e=>props.onAddGlyph(+e.currentTarget.value)}>
                <option>+</option>
                {
                    props.track.rhythm.getPossibleCombinations().map((glyph, i) => 
                        <option key={i} value={glyph}>{glyph}</option>
                    )
                }
            </AddGlyphSelect>
        </RhythmContainer>
        <button onClick={props.onExit}>Continue</button>
    </Container>
}