import { useContext, useEffect, useRef, useState } from "react";
import ModelContext from "../../contexts/ModelContext";
import BeatDetailView from "../views/BeatDetailView";
import { Beat, Rhythm, Sample } from "../../common";

async function getDummyBeat():Promise<Beat>{
    return new Promise(resolve => setTimeout(resolve, 1000)).then(()=>{ 
        return {
            composerID: "abc123",
            title: "test beat 123",
            description: "this is a test beat \nthis is som text after linebreak",
            theme: ["#2B3A55", "#CE7777", "#E8C4C4"],
            rhythmAndSamples:[
                {rhythm:new Rhythm([5,3,8]), sample: {name:"techno-hihat", url:"https://tonejs.github.io/audio/drum-samples/Techno/hihat.mp3"} as Sample},
                {rhythm:new Rhythm([4]), sample: {name:"techno-kick", url:"https://tonejs.github.io/audio/drum-samples/Techno/kick.mp3"} as Sample}
            ],
            likes: 15,
            cpm: 20
        } as Beat
    })
}

export default function BeatDetailPresenter() {

    let {audioModel} = useContext(ModelContext);
    const [glyphs, setGlyphs] = useState(new Set<number>())

    const [beat, setBeat] = useState<Beat|null>(null)
    const [progress, setProgress] = useState(0) //TODO: update in intervals when playing
    const [amplitude, setAmplitude] = useState(0) //TODO: update in intervals when playing
    

    useEffect(()=>{
        getDummyBeat().then(beat=>setBeat(beat))

        return ()=>{
            audioModel.stop()
            audioModel.clear()
        }
    },[])


    function handlePlay(){
        if (beat){
            audioModel.play(
                beat.rhythmAndSamples.map(({sample, rhythm})=>({sampleURL:sample.url, rhythm})), 
            60/beat.cpm)
        }
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
            rhythmsAndSampleNames={beat.rhythmAndSamples.map(({rhythm, sample})=>{return{rhythm, sampleName:sample.name}})}
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