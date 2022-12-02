import { useLoaderData } from "react-router";
import { Beat, Rhythm, Sample } from "../common";
import BeatDetailPresenter from "../components/presenters/BeatDetailPresenter";

export default function BeatPage(){
    const beatID = useLoaderData() as any
    return <BeatDetailPresenter beat={beatID}/>
}

async function getDummyBeat(beatID:string):Promise<Beat>{
    return new Promise(resolve => setTimeout(resolve, 1000)).then(()=>{ 
        return {
            composerID: "abc123",
            title: "test beat 123",
            description: "this is a test beat \nthis is som text after linebreak",
            theme: ["#2B3A55", "#CE7777", "#E8C4C4"],
            tracks:[
                {rhythm:new Rhythm([16,3]), sample: {name:"techno-hihat", url:"https://tonejs.github.io/audio/drum-samples/Techno/hihat.mp3"} as Sample},
                {rhythm:new Rhythm([8]), sample: {name:"techno-kick", url:"https://tonejs.github.io/audio/drum-samples/Techno/kick.mp3"} as Sample},
                {rhythm:new Rhythm([1]), sample: {name:"techno-tom2", url:"https://tonejs.github.io/audio/drum-samples/Techno/tom2.mp3"} as Sample}

            ],
            likes: 15,
            cpm: 20
        } as Beat
    })
}

export const beatLoader = async (data:any) =>{
    const {params} = data;
    return getDummyBeat(params.beatID) //result of this is retrived with "useLoaderData"
}