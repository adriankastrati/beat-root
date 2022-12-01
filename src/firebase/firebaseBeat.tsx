import { beforeAuthStateChanged, onAuthStateChanged } from "firebase/auth"
import {child, DataSnapshot, get, getDatabase, push, ref} from "firebase/database"
import {getCurrentUser } from "./firebaseAuthenticationModel"

 interface sample{
    url: string
    name: string
}
interface rhythmSample{
    sampleID: string
    rhythm: number[]
}

interface Beat {
    composer: string
    title: string
    description: string
    theme: string[]
    likes: number
    RhythmsSamples: rhythmSample[]
}


interface BeatM{
    composer: string
    title: string
    description: string
    theme: string[]
    likes: number
    rhythmAndSamples:{rhythm:number[], sample:sample}[],
}

const db = getDatabase()
function setBeatTest(beat: Beat){
    push(ref(db,"beatsTest/"),{
        composer: beat.composer, 
        title: beat.title,
        description: beat.description,
        theme: beat.theme,
        likes: beat.likes,
        RhythmsSamples: beat.RhythmsSamples,
    })
    if(getCurrentUser()){
        push(ref(db,"usersTest/"),{username: "pasta"}).catch((error) =>{
            console.log(error);
        })
    }
    
    push(ref(db,"samplesTest/"),{name:"gitarr", url:"httphs:///"})
    

}

/**
 * 
 * @param id - identification of beat
 * @returns a promise with the one beat object as the data
 */

async function getBeat(id:string){
    return get(child(ref(db),`beatsTest/${id}`)).then( async (beatSnapshot)=>{

        const samplesAndRhythms : {sample:sample, rhythm:number[]}[] = await Promise.all( beatSnapshot.child("RhythmsSamples").val().map(({rhythm, sampleID}: any)=>{
            // console.log("sampleID ",sampleID)
            // console.log("rhythm ",rhythm)
            
            return get(child(ref(db),`samplesTest/${sampleID}`)).then((sampleSnapshot) => {
                let mySample = sampleSnapshot.toJSON()
                return {sample:mySample, rhythm:rhythm}})
        }));

        return {
            title: beatSnapshot.child("title").val() as string,
            composer: beatSnapshot.child("composer").val() as string,
            description:beatSnapshot.child("description").val() as string,
            theme: beatSnapshot.child("theme").val() as string[],
            likes: beatSnapshot.child("likes").val() as number,
            rhythmAndSamples: samplesAndRhythms
        } as BeatM
    })
}

enum BeatQueryType{
    MostLiked,
    Newest
}

function getQueryBeats(query:BeatQueryType, howMany:number, skip:number){

}

export { setBeatTest, getBeat }
export type { Beat, sample, rhythmSample }

