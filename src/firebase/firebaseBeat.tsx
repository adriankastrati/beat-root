import {addDoc, collection, doc, DocumentData, getDoc, getFirestore, QueryDocumentSnapshot, serverTimestamp, SnapshotOptions, WithFieldValue} from "firebase/firestore"


interface rhythmSample{
    sampleID: string
    rhythm: number[]
}

interface BeatData {
    composer: string
    title: string
    description: string
    theme: string[]
    likes: number
    RhythmsSamples: rhythmSample[]
}
export class Rhythm {
    glyphs: Set<number>

    constructor(glyphs:number[]){
        if(glyphs){
            this.glyphs = new Set(glyphs)
        } else {
            this.glyphs = new Set([])
        }
    }
}

export interface Sample{
    sampleID: string,
    name: string,
    url: string
}

export interface track{ //non mutable
	ID: string
	rhythm: number[],
	sample: string //sample ID
}

export interface Beat{
    ID:string,
    title:string,
    description:string,
    composer:string, //user ID
    likedby:string[], //user IDs
    tracks: string[], //track IDs
    theme: string[],
    cpm:    number
}

const firestore = getFirestore()

const beatConverter ={
    toFirestore:(beat: WithFieldValue<Beat>): DocumentData => {
        return{
            composer: beat.composer,
            title: beat.title,
            description: beat.description,
            theme: beat.theme,
            likedBy: beat.likedby,
            tracks: beat.tracks,
            cpm: beat.cpm,
            creationDate: serverTimestamp()
        };
    },

    fromFirestore(snapshot:  QueryDocumentSnapshot<DocumentData>, options: SnapshotOptions): Beat {
        return {
            composer: snapshot.data().composer,
            title: snapshot.data().title,
            description: snapshot.data().description,
            theme: snapshot.data().theme,
            likedBy: snapshot.data().likedBy,
            tracks: snapshot.data().tracks,
            cpm: snapshot.data().cpm        
        } as unknown as Beat
        
    }
}

async function getBeat(beatID: string): Promise<Beat|null>{
    let docRef = doc(firestore, "beats/", beatID).withConverter(beatConverter);
    return getDoc(docRef).then(beatSnapshot=>{
        if (beatSnapshot.exists()){
            return {...beatSnapshot.data(), ID:beatID} as Beat}
        else return null
    });
    
}



async function addBeat(b:Beat){
    await addDoc(collection(firestore,"beats").withConverter(beatConverter), b)
}

enum BeatQueryType{
    MostLiked,
    Newest
}


function getQueryBeats(howMany:number, skip:number){
   
}

export {getBeat,getQueryBeats,addBeat}
export type { BeatData, rhythmSample, BeatQueryType}





/**
 * 
 * @param id - identification of beat
 * @returns a promise with the one beat object as the data
 */

// async function getBeat(id:string){
//     return get(child(ref(db),`beatsTest/${id}`)).then( async (beatSnapshot)=>{

//         const samplesAndRhythms : {sample:4, rhythm:number[]}[] = await Promise.all( beatSnapshot.child("RhythmsSamples").val().map(({rhythm, sampleID}: any)=>{
//             // console.log("sampleID ",sampleID)
//             // console.log("rhythm ",rhythm)
            
//             return get(child(ref(db),`samplesTest/${sampleID}`)).then((sampleSnapshot) => {
//                 let mySample = sampleSnapshot.toJSON()
//                 return {sample:mySample, rhythm:rhythm}})
//         }));

//         return {
//             title: beatSnapshot.child("title").val() as string,
//             composer: beatSnapshot.child("composer").val() as string,
//             description:beatSnapshot.child("description").val() as string,
//             theme: beatSnapshot.child("theme").val() as string[],
//             likes: beatSnapshot.child("likes").val() as number,
//             rhythmAndSamples: samplesAndRhythms
//         } 
//     })
// }
