import styled from "styled-components";
import { theme, Track } from "../../common";
import DeleteCrossButton from "./common/DeleteCrossButton";
import GlyphComponent from "./common/GlyphComponent";

interface TrackViewProps{
    onEdit?:()=>void,
    onDelete?:()=>void,
    track: Track
}

const OuterContainer = styled.div`
    background-color: ${theme.light};
    border-radius: 30px;
    margin-top:10px;
    padding:10px;
`
const SampleName = styled.div`
    
`
const EditButton = styled.button`

`

export default function TrackView(props:TrackViewProps){
    return <OuterContainer>
        <SampleName>{props.track.sample.name}</SampleName>
        {props.onDelete ? <DeleteCrossButton onClick={props.onDelete}/> : null}
        {props.onEdit ? <EditButton onClick={props.onEdit}>edit</EditButton> : null}
        {props.track.rhythm.getGlyphs().map((glyph, i) => <GlyphComponent key={i} number={glyph}/>)}
    </OuterContainer>
}