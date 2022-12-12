import { useContext, useEffect, useRef, useState } from "react";
import ModelContext from "../../contexts/ModelContext";
import BeatDetailView from "../views/BeatDetailView";
import { Beat, playTracks, Rhythm, Sample } from "../../common";

interface BeatDetailPresenterProps{
    beat: Beat
}

export default function BeatDetailPresenter(props:BeatDetailPresenterProps) {

    let {audioModel} = useContext(ModelContext);
    const [glyphs, setGlyphs] = useState(new Set<number>())

    const [progress, setProgress] = useState(0) //TODO: update in intervals when playing
    const [amplitude, setAmplitude] = useState(0) //TODO: update in intervals when playing
    
    const {beat} = props

    useEffect(()=>{

        return ()=>{
            audioModel.stop()
            audioModel.clear()
        }
    },[])


    function handlePlay(){
        playTracks(beat.tracks, beat.cpm, audioModel)
    }

    function handleStop(){
        audioModel.stop()
    }

    function handleClickCreator(){
        //TODO
    }
    function handleLike(){
        //TODO
    }

    return <div>
        <button onClick={()=>audioModel.init()}>init</button>
        {
        beat ? 
            <BeatDetailView
            onPlay={handlePlay}
            onStop={handleStop}
            onClickCreator={handleClickCreator}
            onLike={handleLike}
            title={beat.title}
            decription={beat.description}
            rhythmsAndSampleNames={beat.tracks.map(({rhythm, sample})=>{return{rhythm, sampleName:sample}})}
            currentProgress={progress}
            amplitude={amplitude}
            /> : "loading..."
        }
        </div>

    // return <div>
    //     <button onClick={()=>audioModel.init()}>init</button>
    //     <button onClick={()=>{
    //         audioModel.play([
    //             {sample:{name:'', url:'',}, rhythm:new Rhythm([3,7,5*2])},
    //         ], 20)
    //     }}>play</button>
    //     <button onClick={()=>
    //         audioModel.play([
    //             {sample:{name:'', url:'',}, rhythm:new Rhythm([3,7,5*2])},
    //         ], 20)
    //     }>stop</button>
    //     <button onClick={()=>console.log(Transport.seconds)}>log transport time</button>
    // </div>
}   