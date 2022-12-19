import { Timestamp} from "@firebase/firestore";
import React, { useEffect, useState, useRef } from "react"
import {useIntersection } from 'react-use'
import { Beat, redirect } from "../../common"
import { getQueryBeats, isBeatLikedByCurrentUser, likeBeatAsUser, queryBeatsByUser, unlikeBeatAsUser} from "./../../model/firebase/firebaseBeat"
import FeedView from "../views/FeedView";
import { getCurrentUserID, getUserInformation, isUserLoggedIn, UserInformation } from "../../model/firebase/firebaseAuthenticationModel";
import { SortBy } from "./../../model/firebase/firebaseBeat";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { cloneDeep } from "lodash";

export interface feedProps{
    userFeed: boolean
}

export interface FeedItem{
    beat: Beat,
    composerInformation: UserInformation
    isLiked: boolean
}

// TODO: refreshing entire page through "swiping down"
const FeedPresenter = (props: feedProps) => {
    const [beats, setBeats] = useState<FeedItem[]>([])
    const [timestamp_now, setTimestamp_now] = useState(Timestamp.fromDate(new Date()))
    const [isLoading, setIsLoading] = useState(false)
    const [lastBeatID, setLastBeatID] = useState<undefined|string>(undefined)
    const [shouldFetch, setShouldFetch] = useState(false)
    const [isUser, setUser] = useState<string|null>(null)
    // for sorted by-state.
    const [sortedBy, setSortedBy] = useState<SortBy>(SortBy.recent)

    //const fetchCount = useRef(0) // for limiting fetches
    
    const targetRef = useRef<HTMLDivElement | null>(null)
    const intersection = useIntersection(targetRef, {
        root:null,
        rootMargin: '100px',
        threshold: 0.3
    });
    

    
    //setTimestamp_now(timestamp_now)
    useEffect(() => {
        getCurrentUserID().then((id)=>{
            if(id)
                setUser(id)
        })
    }, [])


    useEffect(() => {
        //consoleion, intersection?.isIntersecting)
        if (intersection?.isIntersecting && !shouldFetch) {
            setShouldFetch(true)
            setIsLoading(true)
        }

    }, [intersection])


    const MAX_FETCHES = 4 // maybe use for rate-limiting
    const itemsOnFetch = 10 // = large => intersectionobserver hidden after first fetch
    useEffect(()=>{
        
        getCurrentUserID().then(acc=>{
            if (acc)
                setUser(acc)
        })
    },[])

    useEffect(()=>{
        setBeats([])
        setTimestamp_now(Timestamp.fromDate(new Date()))
        setShouldFetch(true)
        setLastBeatID(undefined)
    },[sortedBy])

    useEffect(()=> {
        if(shouldFetch) {
            if (props.userFeed){
                getCurrentUserID().then((userID)=>{
                if(!userID)
                    return

                queryBeatsByUser(userID ,itemsOnFetch, timestamp_now, lastBeatID).then(async (newBeats) => {
                    if(newBeats && 
                        newBeats.length > 0 && 
                        lastBeatID !== newBeats[newBeats.length-1].firestoreBeatID){
                        
                           


                        setBeats(Array.from([...beats, ...await Promise.all(newBeats.map(async (beat) => {
                            
                            return isBeatLikedByCurrentUser(isUser!).then((liked)=>{
                                return getUserInformation(beat.composerID).then((userInfo) => {
                                return {
                                    beat: beat,
                                    composerInformation: userInfo,
                                    isLiked: liked
                                } as FeedItem;
                            });
                            })
                            }))
                        ]))
                        setLastBeatID(newBeats[newBeats.length-1].firestoreBeatID)
                    }
                }).then(()=>{setIsLoading(false)})
                
                setShouldFetch(false)

            })
            }else{
                getQueryBeats(itemsOnFetch, timestamp_now, sortedBy, lastBeatID).then(async (newBeats) => {
                    if(newBeats && newBeats.length > 0 && lastBeatID !== newBeats[newBeats.length-1].firestoreBeatID) {
                        setBeats(Array.from([...beats, ...await Promise.all(newBeats.map(async (beat) => {
                            return isBeatLikedByCurrentUser(beat.firestoreBeatID).then((liked)=>{
                                return getUserInformation(beat.composerID).then((userInfo) => {
                                    return {
                                        beat: beat,
                                        composerInformation: userInfo,
                                        isLiked: liked
                                    } as FeedItem;
                                });
                            })
                        }))]))                    
                        
                    setLastBeatID(newBeats[newBeats.length-1].firestoreBeatID)

                }}) 
                .then(()=>{setIsLoading(false)})
                
                setShouldFetch(false)
            }
        } 
     
    }, [shouldFetch])


    function likeBeat(beatID: string, likes:number){
        isUserLoggedIn().then(acc=>{
            if (acc){
                isBeatLikedByCurrentUser(beatID).then(like=>{
                    const index = beats.findIndex(item=>item.beat.firestoreBeatID === beatID)
                    let newBeats = [...beats]
                    let newItem = cloneDeep(beats[index])

                    if(like){
                        unlikeBeatAsUser(beatID, likes)
                        

                        newItem.isLiked = false
                        newItem.beat.likes -= 1
                    } else {
                        likeBeatAsUser(beatID,likes)
                        newItem.isLiked = true
                        newItem.beat.likes += 1
                    }

                    newBeats[index] = newItem
                    setBeats(newBeats)
                })  
            }
        })
    }

    function refreshBeats(){
        setBeats([])
        setTimestamp_now(Timestamp.fromDate(new Date()))
        setShouldFetch(true)
        setLastBeatID(undefined)
    }

    
    function handleFilterChange(filter: string) {
        if(filter === "recent" )
            setSortedBy(SortBy.recent)
        else if(filter==="likes")
            setSortedBy(SortBy.likes)
    }

    return (
        <FeedView 
            isUser= {isUser}
            beats={beats}
            isLoading={isLoading}
            shouldFetch={shouldFetch}
            targetRef={targetRef}
            itemsOnFetch= {itemsOnFetch}
            lastItem = {lastBeatID}
            feedSortedBy={sortedBy.toString()}
            setFeedSortedBy = {handleFilterChange}
            onLikeBeat = {likeBeat}
            onRefresh ={props.userFeed?undefined:refreshBeats}
        />
    )
}

export default FeedPresenter