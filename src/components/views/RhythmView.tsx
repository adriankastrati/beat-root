import { Rhythm } from "../../common";

interface RhythmViewProps{
    rhythm: Rhythm
}

export default function RhythmView(props:RhythmViewProps){
    return <div>{
        props.rhythm.getGlyphs().map(glyph =><li key={glyph}>{glyph}</li>)
        }</div>
}