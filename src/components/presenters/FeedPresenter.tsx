import { Timestamp} from "@firebase/firestore";
import { useEffect, useState, useRef } from "react"
import {useIntersection } from 'react-use'
import { Beat } from "../../common"
import { getQueryBeats, isBeatLikedByCurrentUser, likeBeatAsUser} from "./../../model/firebase/firebaseBeat"
import FeedView from "../views/FeedView";
import { getCurrentUserID } from "../../model/firebase/firebaseAuthenticationModel";
//import { contextFree, StyledComponent } from "styled-components"


// TODO: firebase like beat functionality
// TODO: filters
// TODO: midi copy
// TODO: fix first fetch of beats

    // these cards should be in common when implementing
   

    

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

<<<<<<< HEAD
    const itemsOnFetch = 3
=======
    const itemsOnFetch = 10
>>>>>>> 880f22bf27382a530d2e35d1ecd96c0afb13fc60
    const MAX_FETCHES = 4

    function fetchData() {
            setLoading(true)
            //setTimestamp_now(Timestamp.fromDate(new Date()))
            //                 root fetch timestamp ----v
            getQueryBeats(itemsOnFetch, timestamp_now,lastBeatID).then((newBeats) => {if(newBeats){
                // console.log(offset, itemsOnFetch, timestamp_now)
                //setBeats(Array.from([...beats,...newBeats]))
                // newBeats.reverse()
                setBeats(beats.concat(newBeats))
                setLoading(false)
            }})
    }

    useEffect(() => {
        if (intersection?.isIntersecting && !loading ) {
            //console.log(intersection?.isIntersecting)
            setLastBeatID(beats[beats.length - 1].firestoreBeatID)

            setOffset(offset + itemsOnFetch)
            fetchData()
            if(beats == null) {
                console.log("beats == null")
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
