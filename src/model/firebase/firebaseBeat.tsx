import {addDoc, collection, connectFirestoreEmulator, doc, DocumentData, getDoc, getDocs, getFirestore, limit, orderBy, query, QueryDocumentSnapshot, serverTimestamp, SnapshotOptions, startAfter, Timestamp, where, WithFieldValue} from "firebase/firestore"
import { Beat, Rhythm, Sample, Track } from "../../common"
import { getCurrentUserID } from "./firebaseAuthenticationModel"

const firestore = getFirestore()

const beatConverter ={
    toFirestore:(beat: WithFieldValue<Beat>): DocumentData => {
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
            creationDate: Timestamp.now().valueOf()
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
            return {...beatSnapshot.data(),
                ID:beatID, tracks: await Promise.all(beatSnapshot.data().tracks.map(async (track : any)=> {
                    return {rhythm: new Rhythm(track.track), sample: await getSampleByID(track.sampleID)}
                }))
            
            } as Beat}
        else return null
    });
    
}


async function createBeat(beat:Beat){
    getCurrentUserID().then(id =>{
        if (id)
            beat.composerID = id
    }).then(async ()=>{
        await addDoc(collection(firestore,"beats").withConverter(beatConverter), beat)
    })
    // .catch(()=>{
    //     throw new Error("not-signed-in")
    // })
}


async function getQueryBeats(howMany:number, skip:number, startTimeStamp: Timestamp):Promise<null | Beat[]>{  
    const beatRef = collection(firestore, "beats");
    let q = query(beatRef, where("creationDate","<",startTimeStamp.valueOf()), orderBy("creationDate", "asc"), limit(howMany),startAfter(skip),);
    
    
    return getDocs(q.withConverter(beatConverter)).then(async docs=>{
        return Promise.all(docs.docs.map(async beatSnapshot=>{           
            return {...beatSnapshot.data(), 
                ID:beatSnapshot.id,
                tracks: await Promise.all(beatSnapshot.data().tracks.map((async (track : any)=> {
                    return {rhythm: new Rhythm(track.track), sample: await getSampleByID(track.sampleID)}
                })))
            } as Beat
        }))
    })
}
    


export interface user{
    authID: string 
    description: string 
    email: string
    username: string
}
async function getUserById(userID: string): Promise<user|null>{

    let userRef = doc(firestore, "users/", userID);
    return await getDoc(userRef).then(user=> {
        
        if (user.exists()){
            return user.data() as user
        }
        return null
    })
}
async function isBeatLikedByCurrentUser(beatID: string): Promise<boolean>{

    let beatRef = doc(firestore, "beats/", beatID);
   return await getCurrentUserID().then(async userID=>{

    return await getDoc(beatRef).then(beat =>{
        if (beat.data()?.likedBy.includes(userID)){
            return true
        }
        return false
    })})
    
}

async function isBeatLikedByUserID(beatID: string, userID:string): Promise<boolean>{
    let beatRef = doc(firestore, "beats/", beatID);

    return await getDoc(beatRef).then(beat =>{
        if (beat.data()?.likedBy.includes(userID)){
            return true
        }
        return false
    })
}


export {getBeatByID,createBeat, getUserById, isBeatLikedByCurrentUser, isBeatLikedByUserID, getQueryBeats}