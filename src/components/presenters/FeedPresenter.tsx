import { Timestamp} from "@firebase/firestore";
import { useEffect, useState, useRef } from "react"
import {useIntersection } from 'react-use'
import { Beat } from "../../common"
import { getQueryBeats, isBeatLikedByCurrentUser, likeBeatAsUser, unlikeBeatAsUser} from "./../../model/firebase/firebaseBeat"
import FeedView from "../views/FeedView";
import { getCurrentUserID } from "../../model/firebase/firebaseAuthenticationModel";
import { SortBy } from "./../../model/firebase/firebaseBeat";

// TODO: refreshing entire page through "swiping down"
const FeedPresenter = () => {
    const [beats, setBeats] = useState<Beat[]>([])
    const [timestamp_now, setTimestamp_now] = useState(Timestamp.fromDate(new Date()))
    const [isLoading, setIsLoading] = useState(false)
    const [lastBeatID, setLastBeatID] = useState<undefined|string>(undefined)
    const [shouldFetch, setShouldFetch] = useState(false)

    //const fetchCount = useRef(0) // for limiting fetches
    const targetRef = useRef<HTMLDivElement | null>(null)
    const intersection = useIntersection(targetRef, {
        root:null,
        rootMargin: '1px',
        threshold: 1.0
    });
    
    
    //setTimestamp_now(timestamp_now)


    useEffect(() => {
        //console.log("intersecting", intersection, intersection?.isIntersecting)
        if (intersection?.isIntersecting && !shouldFetch) {
            setShouldFetch(true)
            setIsLoading(true)
        }
    }, [intersection])


    const MAX_FETCHES = 4 // maybe use for rate-limiting
    const itemsOnFetch = 20 // = intersectionobserver hidden after first fetch

    useEffect(()=> {
        if(shouldFetch) {
            getQueryBeats(itemsOnFetch, timestamp_now, SortBy.recent, lastBeatID)
            .then((newBeats) => {
                if(newBeats && 
                    newBeats.length > 0 && 
                    lastBeatID != newBeats[newBeats.length-1].firestoreBeatID
                    ) {
                setBeats(Array.from([...beats, ...newBeats]))
                setLastBeatID(newBeats[newBeats.length-1].firestoreBeatID)

            } else {console.log("already at the oldest item")}}) 
            .then(()=>{console.log("last beat fetched has id: ",lastBeatID)})
            .then(()=>{setIsLoading(false)})
            
            setShouldFetch(false)
        } 
    }, [shouldFetch])


    function likeBeat(beatID: string, likes:number){
        likeBeatAsUser(beatID, likes)
    }
    function refreshBeats(){
        setTimestamp_now(Timestamp.fromDate(new Date()))
    }
    return (
        <FeedView 
            beats={beats}
            isLoading={isLoading}
            targetRef={targetRef}
            itemsOnFetch= {itemsOnFetch}
            lastItem = {lastBeatID}
            onLikeBeat = {likeBeat}
        />
    )
}

export default FeedPresenter