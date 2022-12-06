import { Beat, Rhythm, Sample } from "../common"
import { getColorRandomScheme, getColorSchemeByTracks } from "../common/colorSource"
export default function ColorTestPage(){
    async function getDummyBeat(beatID:string):Promise<Beat>{
        return new Promise(resolve => setTimeout(resolve, 1000)).then(()=>{ 
            return {
                composerID: "abc123",
                title: "test beat 123",
                description: "this is a test beat \nthis is som text after linebreak",
                theme: ["#2B3A55", "#CE7777", "#E8C4C4"],
                tracks:[
                    {rhythm:new Rhythm([16,3]), sample: {name:"techno-hihat", url:"https://tonejs.github.io/audio/drum-samples/Techno/hihat.mp3"} as Sample},
                    {rhythm:new Rhythm([8,7]), sample: {name:"techno-kick", url:"https://tonejs.github.io/audio/drum-samples/Techno/kick.mp3"} as Sample},
                    {rhythm:new Rhythm([1]), sample: {name:"techno-tom2", url:"https://tonejs.github.io/audio/drum-samples/Techno/tom2.mp3"} as Sample}
                ],
                likes: 15,
                cpm: 20
            } as Beat
        })
    }

    async function getColorScheme(){
        console.log(getColorRandomScheme(5))
    }

    return (
    <div>
        <button onClick={getColorScheme}>pasta</button>
  
    </div>
  )
    
}

