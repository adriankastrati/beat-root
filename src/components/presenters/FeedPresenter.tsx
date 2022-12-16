import { Timestamp} from "@firebase/firestore";
import React, { useEffect, useState, useRef } from "react"
import {useIntersection } from 'react-use'
import { Beat } from "../../common"
import { getQueryBeats, isBeatLikedByCurrentUser, likeBeatAsUser, queryBeatsByUser, unlikeBeatAsUser} from "./../../model/firebase/firebaseBeat"
import FeedView from "../views/FeedView";
import { getCurrentUserID } from "../../model/firebase/firebaseAuthenticationModel";
import { SortBy } from "./../../model/firebase/firebaseBeat";

export interface feedProps{
    userFeed: boolean
}

// TODO: refreshing entire page through "swiping down"
const FeedPresenter = (props: feedProps) => {
    const [beats, setBeats] = useState<Beat[]>([])
    const [timestamp_now, setTimestamp_now] = useState(Timestamp.fromDate(new Date()))
    const [isLoading, setIsLoading] = useState(false)
    const [lastBeatID, setLastBeatID] = useState<undefined|string>(undefined)
    const [shouldFetch, setShouldFetch] = useState(false)
    // for sorted by-state.
    const [sortedBy, setSortedBy] = useState<string>()

    //const fetchCount = useRef(0) // for limiting fetches
    const targetRef = useRef<HTMLDivElement | null>(null)
    const intersection = useIntersection(targetRef, {
        root:null,
        rootMargin: '100px',
        threshold: 0.3
    });

    
    //setTimestamp_now(timestamp_now)


    useEffect(() => {
        //console.log("intersecting", intersection, intersection?.isIntersecting)
        if (intersection?.isIntersecting && !shouldFetch) {
            setShouldFetch(true)
            setIsLoading(true)
        }

    }, [intersection, sortedBy])


    const MAX_FETCHES = 4 // maybe use for rate-limiting
    const itemsOnFetch = 15 // = large => intersectionobserver hidden after first fetch

    enum Filters {
        "recent" = SortBy.recent,
        "likes" = SortBy.likes
    }
    

    useEffect(()=> {
        if(shouldFetch) {
            if (props.userFeed){
                getCurrentUserID().then((userID)=>{
                queryBeatsByUser(userID ,itemsOnFetch, timestamp_now, lastBeatID).then((newBeats) => {
                    if(newBeats && 
                        newBeats.length > 0 && 
                        lastBeatID !== newBeats[newBeats.length-1].firestoreBeatID
                        ){
                        setBeats(Array.from([...beats, ...newBeats]))
                        setLastBeatID(newBeats[newBeats.length-1].firestoreBeatID)

                    }
                }).then(()=>{console.log("last beat fetched has id: ",lastBeatID)}).then(()=>{setIsLoading(false)})
                
                setShouldFetch(false)

            })
            }else{
                getQueryBeats(itemsOnFetch, timestamp_now, SortBy.recent, lastBeatID).then((newBeats) => {
                    if(newBeats && newBeats.length > 0 && lastBeatID !== newBeats[newBeats.length-1].firestoreBeatID) {
                    setBeats(Array.from([...beats, ...newBeats]))
                    setLastBeatID(newBeats[newBeats.length-1].firestoreBeatID)

                }}) 
                .then(()=>{console.log("last beat fetched has id: ",lastBeatID)})
                .then(()=>{setIsLoading(false)})
                
                setShouldFetch(false)
            }
        } 
     
    }, [shouldFetch])


    function likeBeat(beatID: string, likes:number){
        likeBeatAsUser(beatID, likes)
    }
    function refreshBeats(){
        setTimestamp_now(Timestamp.fromDate(new Date()))
    }
    function handleFilterChange(e: React.FormEvent<HTMLInputElement>) {
        setSortedBy(e.currentTarget.value)
    }
    return (
        <FeedView 
            beats={beats}
            isLoading={isLoading}
            shouldFetch={shouldFetch}
            targetRef={targetRef}
            itemsOnFetch= {itemsOnFetch}
            lastItem = {lastBeatID}
            //setFeedSortedBy = {handleFilterChange}
            onLikeBeat = {likeBeat}
        />
    )
}

export default FeedPresenter