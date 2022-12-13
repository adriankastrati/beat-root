import { Timestamp} from "@firebase/firestore";
import { useEffect, useState, useRef } from "react"
import {useIntersection } from 'react-use'
import { Beat } from "../../common"
import { getQueryBeats, isBeatLikedByCurrentUser, likeBeatAsUser} from "./../../model/firebase/firebaseBeat"
import FeedView from "../views/FeedView";
import { getCurrentUserID } from "../../model/firebase/firebaseAuthenticationModel";
//import { contextFree, StyledComponent } from "styled-components"


// TODO: fix first fetch of beats
// TODO: time-out function when intersection can't change
// TODO: filters
// TODO: midi copy

const FeedPresenter = () => {

    const [beats, setBeats] = useState<Beat[]>([]) //might be | null?
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [timestamp_now, setTimestamp_now] = useState(Timestamp.fromDate(new Date()))
    const [lastBeatID, setLastBeatID] = useState<undefined|string>(undefined)

    //const fetchCount = useRef(0) // for limiting fetches
    const targetRef = useRef<HTMLDivElement | null>(null)
    const intersection = useIntersection(targetRef, {
        root:null,
        rootMargin: '200px',
        threshold: 0.7
    });
    
    //setTimestamp_now(timestamp_now)

    const itemsOnFetch = 10
    const MAX_FETCHES = 4


    function fetchData() {
            setLoading(true)
            //setTimestamp_now(Timestamp.fromDate(new Date()))
            getQueryBeats(itemsOnFetch, timestamp_now,lastBeatID).then((newBeats) => {if(newBeats){
                //setBeats(Array.from([...beats,...newBeats]))
                // newBeats.reverse()
                setBeats(beats.concat(newBeats))
                setLoading(false)
            }})
    }

    useEffect(() => {
        if (intersection?.isIntersecting) {
            console.log("aaaah, I'm intersecting!!!!",intersection?.isIntersecting)
            fetchData()
            if (beats.length > 0) {
                setLastBeatID(beats[beats.length - 1].firestoreBeatID)
                setOffset(offset + itemsOnFetch)
            }
            if(beats == null) {
                console.log("beats == null", beats)
                fetchData()
            } else {
                console.log("beats != null")

                return
            }
        }
    }, [intersection]) 


function likeBeat(beatID: string){
    likeBeatAsUser(beatID)
}

    return (
        <FeedView 
            beats={beats}
            offset={offset}
            loading={loading}
            targetRef={targetRef}
            itemsOnFetch= {itemsOnFetch}
            onLikeBeat = {likeBeat}
        />
    )
}

export default FeedPresenter