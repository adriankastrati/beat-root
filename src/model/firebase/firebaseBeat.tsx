import {addDoc, arrayRemove, arrayUnion, collection, doc, DocumentData, endAt, endBefore, getDoc, getDocs, getFirestore, limit, orderBy, Query, query, QueryDocumentSnapshot, serverTimestamp, SnapshotOptions, startAfter, startAt, Timestamp, updateDoc, where, WithFieldValue} from "firebase/firestore"
import { getBlob, getStorage, listAll, ref } from "firebase/storage"
import { Beat, Rhythm, Sample, Track } from "../../common"
import { getCurrentUserID, isUserLoggedIn } from "./firebaseAuthenticationModel"

const firestore = getFirestore()
const storage = getStorage()

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
                firestoreBeatID:beatID, tracks: await Promise.all(beatSnapshot.data().tracks.map(async (track : any)=> {
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
}


async function getQueryBeats(howMany:number, startTimeStamp: Timestamp, startBeatID?:string):Promise<null | Beat[]>{  

    async function getBeats(query: Query<DocumentData>){
        return getDocs(query.withConverter(beatConverter)).then(async docs=>{
            return Promise.all(docs.docs.map(async beatSnapshot=>{   
    
                return {...beatSnapshot.data(), 
                    firestoreBeatID:beatSnapshot.id,
                    tracks: await Promise.all(beatSnapshot.data().tracks.map((async (track : any)=> {
                        return {rhythm: new Rhythm(track.track), sample: await getSampleByID(track.sampleID)}
                    })))
                } as Beat
            }))
        })
    }

    const beatRef = collection(firestore, "beats");
    let queryBeats: Query<DocumentData>

   if (startBeatID){
        let docRef = doc(firestore, "beats/", startBeatID);
        return getDoc(docRef).then(async startAfterSnapshot=>{
            queryBeats = query(beatRef,
                where("creationDate","<",startTimeStamp.valueOf()), 
                orderBy("creationDate", "desc"), 
                limit(howMany),
                startAfter(startAfterSnapshot)
            );
        }).then(async ()=>{
            console.log(getBeats(queryBeats).then(beats=>{
                return beats
            }), 2)
            return getBeats(queryBeats).then(beats=>{
                return beats
            })
        })
    }

    queryBeats = query(beatRef,
        where("creationDate","<",startTimeStamp.valueOf()), 
        orderBy("creationDate", "desc"), 
        limit(howMany)
    );
        
    console.log(getBeats(queryBeats).then((beats)=>{
        return beats
    }),1)


    return getBeats(queryBeats).then((beats)=>{
        return beats
    })
}

async function queryBeatsByUser(howMany:number, userID: string, startBeatID?:string  ): Promise<null | Beat[]>{
   
    async function getBeats(query: Query<DocumentData>){
        return getDocs(query.withConverter(beatConverter)).then(async docs=>{
            return Promise.all(docs.docs.map(async beatSnapshot=>{   
    
                return {...beatSnapshot.data(), 
                    firestoreBeatID:beatSnapshot.id,
                    tracks: await Promise.all(beatSnapshot.data().tracks.map((async (track : any)=> {
                        return {rhythm: new Rhythm(track.track), sample: await getSampleByID(track.sampleID)}
                    })))
                } as Beat
            }))
        })
    }

    const beatRef = collection(firestore, "beats");
    let queryBeats: Query<DocumentData>

   if (startBeatID){
        let docRef = doc(firestore, "beats/", startBeatID);
        return getDoc(docRef).then(async startAfterSnapshot=>{
            queryBeats = query(beatRef,
                where("composer","==",userID),
                orderBy("creationDate", "desc"), 
                limit(howMany),
                startAfter(startAfterSnapshot)
            );
        }).then(async ()=>{
            console.log(getBeats(queryBeats).then(beats=>{
                return beats
            }), 2)
            return getBeats(queryBeats).then(beats=>{
                return beats
            })
        })
    }

    queryBeats = query(beatRef,
        where("composer","==",userID),
        orderBy("creationDate", "desc"), 
        limit(howMany)
    );
        
    console.log(getBeats(queryBeats).then((beats)=>{
        return beats
    }),1)


    return getBeats(queryBeats).then((beats)=>{
        return beats
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

async function getAllSamples(): Promise<Sample[]>{
    let samplesCollection = collection(firestore, "samples/");

    return await getDocs(query(samplesCollection)).then(sampleSnapshot=>{
       return sampleSnapshot.docs.map(sample =>{
            const { url, name }: { url: string; name: string } = sample.data() as any
            return {url: url, name:name, firestoreSampleID: sample.id} as Sample
        })
    })   
} 

async function likeBeatAsUser(beatID: string):Promise<boolean>{

    return getCurrentUserID().then(async (userID)=>{       
        let beatREF = doc(firestore,"beats/", beatID)
        await updateDoc(beatREF, {
        likedBy: arrayUnion(userID)
        });
        
        return true
    }).catch((e)=>{
        return false
    })
}

async function unlikeBeatAsUser(beatID: string):Promise<boolean>{
    return getCurrentUserID().then(async (userID)=>{
        
        let beatREF = doc(firestore,`beats/${beatID}`,)
        await updateDoc(beatREF, {
        likedBy: arrayRemove(userID)
        });
        return true
    }).catch(()=>{
        return false
    })
}

async function getSamples(): Promise<void|string[]> {
    let sampleRef = ref(storage, 'samples/')
    return listAll(sampleRef).then((res) => {
        return Promise.all(res.items.map((itemRef) => {
            return getBlob(itemRef).then(blob=>{
                return URL.createObjectURL(blob)
            })
        }))

    }).catch((error) => {
        console.log(error)
    });
}


export {queryBeatsByUser,getSamples, unlikeBeatAsUser, likeBeatAsUser, getAllSamples,getBeatByID,createBeat, getUserById, isBeatLikedByCurrentUser, isBeatLikedByUserID, getQueryBeats}