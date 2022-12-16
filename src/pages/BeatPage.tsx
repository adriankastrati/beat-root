// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Beat, Rhythm, Sample } from "../common";
// import BeatDetailPresenter from "../components/presenters/BeatDetailPresenter";

// export default function BeatPage(){
//     const params = useParams() as any
//     const [beat, setBeat] = useState<Beat|null>(null)

//     useEffect(()=>{
//         getDummyBeat(params.beatID).then(beat=>{
//             console.log(beat)
//             setBeat(beat)}
//         )
//     },[])

//     return beat ? <BeatDetailPresenter beat={beat}/> : <div>TODO: loading animation</div>
// }

// async function getDummyBeat(beatID:string):Promise<Beat>{
//     return new Promise(resolve => setTimeout(resolve, 1000)).then(()=>{ 
//         return {
//             composerID: "abc123",
//             title: "test beat 123",
//             description: "this is a test beat \nthis is som text after linebreak",
//             theme: ["#2B3A55", "#CE7777", "#E8C4C4"],
//             tracks:[
//                 {rhythm:new Rhythm(16), sample: "techno-hihat"},
//                 {rhythm:new Rhythm(8), sample: "techno-kick"},
//             ],
//             likes: 15,
//             bpm: 120
//         } as Beat
//     })
// }¨
export {}