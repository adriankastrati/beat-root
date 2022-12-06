import { Timestamp} from "@firebase/firestore";
import { useEffect, useState, useRef } from "react"
import {useIntersection } from 'react-use'
import { Beat } from "../../common"
import { getQueryBeats } from "./../../model/firebase/firebaseBeat"
import styled, {StyledComponent} from "styled-components"
//import { contextFree, StyledComponent } from "styled-components"

// state of date, offset

// offset query, the offset of items that should be fetched from
//      database based on how many items that have been loaded

    const ThemedCard = styled.div`
    width: 400px;
    height: 450px;
    border-radius: 5%;
    position: relative;
    display: flex;
    //background-color: --;
    background-color: rgb(176, 115, 255);
    justify-content: center;
    align-content: center;
    margin: 5%;
    `;

    const BeatParent = styled.div`
    width:400px;
    height:400px;
    border-radius: 5%;
    position:relative;
    display: flex;
    //background-color: rgb(236, 228, 178);
    justify-content: center;
    align-content: center;
    `;
    

const FeedPresenter = () => {

    const [beats, setBeats] = useState<Beat[]>([]) //might be | null?
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [timestamp_now, setTimestamp_now] = useState(Timestamp.fromDate(new Date()))

    //const fetchCount = useRef(0) // for limiting fetches
    const targetRef = useRef<HTMLDivElement | null>(null)
    const intersection = useIntersection(targetRef, {
        root:null,
        rootMargin: '200px',
        threshold: 0.7
    });
    
    //setTimestamp_now(timestamp_now)

    const ITEMS_ON_FETCH = 10
    const MAX_FETCHES = 4

    function fetchData() {
            setLoading(true)
            getQueryBeats(ITEMS_ON_FETCH, page, timestamp_now).then((newBeats) => {if(newBeats){
                console.log(ITEMS_ON_FETCH, page, timestamp_now)
                //setBeats(Array.from([...beats,...newBeats]))
                setBeats(beats.concat(newBeats))
                setLoading(false)
                return
            }})
    }

    useEffect(() => {
    
        if (intersection?.isIntersecting && !loading ) {
            //console.log(intersection?.isIntersecting)
            setPage(page + ITEMS_ON_FETCH)
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


    

    // this should be in the view instead, but I can't seem to figure out how
    //  to send the props in a way that allows for intersection observing with refs
    //  like below
    // 
    return (
            <div>
                <div> 
                    {beats ? 
                        beats && beats.slice(0, page + ITEMS_ON_FETCH).map((beat, index) => {
                        //console.log("loadin:" + loading)
                        return (
                            <div>
                                <div>
                                <ThemedCard color={beat.theme[0][0]}>
                                <p key={index}> index={index}<br/>
                                <strong>Title:</strong> {beat.title}<br />
                                <strong>Composer ID:</strong> {beat.composerID}<br />
                                <strong>Likes:</strong> {beat.likes}<br />
                                <strong>Theme:</strong> {beat.theme.join(',')}<br />
                                </p>
                                </ThemedCard>
                                </div>
                            </div>
                        )
                    }):<img src="https://media.tenor.com/tga0EoNOH-8AAAAC/loading-load.gif"></img>}  
                    <div ref={targetRef}></div>
                </div>
            </div>
    )
}

export default FeedPresenter
