import {addDoc, collection, doc, DocumentData, getDoc, getFirestore, QueryDocumentSnapshot, serverTimestamp, SnapshotOptions, WithFieldValue} from "firebase/firestore"
import {  } from "./firebaseAuthenticationModel"



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

export interface User{
    firestoreUserID: string,
    username: string,
    //TODO: firebaseAuth: firebase.Auth
}

export interface Sample{
    firestoreSampleID:string,
    name: string,
    url: string,
}

export interface Track{
    rhythm:Rhythm,
    sample:Sample,
}

export interface Beat{
    firestoreBeatID:string
    composerID: string, //user ID
    title: string,
    description: string,
    theme: string[],
    tracks: Track[],
    likes: number,
    cpm: number
}

const firestore = getFirestore()

const beatConverter ={
    toFirestore:(beat: WithFieldValue<Beat>): DocumentData => {
        console.log(beat)
        return{
            composer: beat.composerID,
            title: beat.title,
            description: beat.description,
            theme: beat.theme,
            likedBy: [],
            tracks: (beat.tracks as Track[]).map((track)=> { 
                return {sampleID: track.sample.firestoreSampleID, track: Array.from(track.rhythm.glyphs)}
            }),
            cpm: beat.cpm,
            creationDate: serverTimestamp()
        };
    },


    fromFirestore(snapshot:  QueryDocumentSnapshot<DocumentData>, options: SnapshotOptions): any {        
        return {
            composer: snapshot.data().composer,
            title: snapshot.data().title,
            description: snapshot.data().description,
            theme: snapshot.data().theme,
            likes: snapshot.data().likedBy.length,
            tracks: snapshot.data().tracks,
            cpm: snapshot.data().cpm        
        } as unknown as Beat
    }
}

async function getSampleByID(sampleID: string){

    let sampleRef = doc(firestore, "samples/", sampleID);
    return getDoc(sampleRef).then(sampleSnapshot=>{
    
    if (sampleSnapshot.exists())
        return {...sampleSnapshot.data(), firestoreSampleID:sampleID} as Sample 
    
    return null
    })
}

async function getBeatByID(beatID: string): Promise<Beat|null>{
    let docRef = doc(firestore, "beats/", beatID).withConverter(beatConverter);
    return await getDoc(docRef).then(async beatSnapshot=>{
        if (beatSnapshot.exists()){
            console.log(beatSnapshot.data().tracks)
            return {...beatSnapshot.data(), ID:beatID, tracks: await Promise.all(beatSnapshot.data().tracks.map((track : any)=>getSampleByID(track.sampleID)))} as Beat}
        else return null
    });
    
}

function createTrack(track: Track){}


async function createBeat(b:Beat){
    await addDoc(collection(firestore,"beats").withConverter(beatConverter), b)
}

enum BeatQueryType{
    MostLiked,
    Newest
}


// function getQueryBeats(howMany:number, skip:number, startTimeStamp: typeof serverTimestamp):Promise<Beat[]>{}

// function getSampleByID(sampleID: string): Promise<Sample>{}

// function getTrackByID(trackID: string): Promise<Track>{}

// function getUserById(userID: string): Promise<User>{}

// function isBeatLikedByUserID(beatID: string): Promise<boolean>{
//     getCurrentUser()
// }

export {getBeatByID,createBeat}




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
