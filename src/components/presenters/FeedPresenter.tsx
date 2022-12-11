import { Timestamp} from "@firebase/firestore";
import { useEffect, useState, useRef } from "react"
import {useIntersection } from 'react-use'
import { Beat } from "../../common"
import { getQueryBeats } from "./../../model/firebase/firebaseBeat"
import styled, {StyledComponent} from "styled-components"
//import { contextFree, StyledComponent } from "styled-components"

// TODO: firebase like beat functionality
// TODO: filters
// TODO: midi copy

    // these cards should be in common when implementing
    const BeatParent = styled.div`
        width:400px;
        height:400px;
        border-radius: 5%;
        position:relative;
        display: flex;
        background-color: rgb(236, 228, 178);
        justify-content: center;
        align-content: center;
        margin: 5%;
    `;
    const ThemedCard = styled.div`
        width: 400px;
        height: 350px;
        border-radius: 5%;
        position: relative;
        display: flex;
        //background-color: --;
        background-color: rgb(176, 115, 255);
        justify-content: center;
        align-content: center;
        margin: 5%;
    `;
    const ButtonsContainer = styled.div`
        position: absolute; 
        top: 90%;
        right: 78%;
    `;
    const CardButton = styled.button`
    `;

    

const FeedPresenter = () => {

    const [beats, setBeats] = useState<Beat[]>([]) //might be | null?
    const [offset, setOffset] = useState(0)
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

    const ITEMS_ON_FETCH = 7
    const MAX_FETCHES = 4

    function fetchData() {
            setLoading(true)
            //setTimestamp_now(Timestamp.fromDate(new Date()))
            //                 root fetch timestamp ----v
            getQueryBeats(ITEMS_ON_FETCH, offset, timestamp_now).then((newBeats) => {if(newBeats){
                console.log(offset, ITEMS_ON_FETCH, timestamp_now)
                //setBeats(Array.from([...beats,...newBeats]))
                setBeats(beats.concat(newBeats))
                setLoading(false)
            }})
    }

    useEffect(() => {
        if (intersection?.isIntersecting && !loading ) {
            //console.log(intersection?.isIntersecting)
            setOffset(offset + ITEMS_ON_FETCH)
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

    // need firebase functions for this
    function likeHandler():void {
        console.log("liked")
    }
    function midiCopyHandler():void {
        console.log("copied midi")
    }

    

    // this should be in the view instead, but I can't seem to figure out how
    //  to send the props in a way that allows for intersection observing with refs
    //  like below
    // 
    return (
            <div>
                <div> 
                    {beats ? 
                        beats && beats.slice(0, offset + ITEMS_ON_FETCH).map((beat, key) => {
                        //console.log("loadin:" + loading)
                        return (
                                <BeatParent key={key}>
                                    <ThemedCard color={beat.theme[0][0]}>
                                        <p> fetch index={key}<br/>
                                        <strong></strong> {beat.title} by: <strong>{beat.composerID}user</strong><br />
                                        <strong>Theme:</strong> {beat.theme.join(',')}<br />
                                        </p>
                                    </ThemedCard>
                                    <ButtonsContainer>
                                        <CardButton onClick={likeHandler}>{beat.likes}</CardButton>
                                        <CardButton onClick={midiCopyHandler}>midi</CardButton>
                                    </ButtonsContainer>
                                </BeatParent>
                        )
                    }):<img src="https://media.tenor.com/tga0EoNOH-8AAAAC/loading-load.gif"></img>}  
                    <div ref={targetRef}></div>
                </div>
            </div>
    )
}

export default FeedPresenter
