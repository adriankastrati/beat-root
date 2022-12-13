import { MutableRefObject } from "react"
import { Beat } from "../../common"
import { likeBeatAsUser, isBeatLikedByCurrentUser } from "../../model/firebase/firebaseBeat"
import styled from "styled-components";
import { textStyles, theme } from "../../common";
import React from "react";
import MainButton, { MainButtonType } from "./common/MainButton";
import { BeatParent, ButtonsContainer, ThemedCard } from "./common/feedViewElements";

const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:20px;
`
const Feed = styled.div`
    display: flex;
    flex-direction: row;   
    flex-wrap: wrap; 
    justify-content: center;
`
const Center = styled.div`
align-items: center;
align-self: center;
margin: 0 auto;
`

interface FeedViewProps{
    beats: Beat[]
    offset: number
    loading: boolean
    targetRef: MutableRefObject<HTMLDivElement | null>
    itemsOnFetch: number
    onLikeBeat: (beatID: string) => void
}

export default function FeedView(props:FeedViewProps){

    // need firebase functions for this
    function likeHandler(beatID: string):void {
        props.onLikeBeat(beatID)
    }

    function midiCopyHandler():void {
        console.log("copied midi")
    }
    function feedElementCB(beat: any, key: any){
        return (<OuterBox key={key}>
            <BeatParent> 

                <ThemedCard color={beat.theme}>
                <div>{beat.firestoreBeatID}</div>

                    <p> fetch index={key}<br/>
                    {beat.title} by: <strong>{beat.composerID}user</strong><br />
                    <strong>Theme:</strong> {beat.theme.join(',')}<br />
                    </p>

                </ThemedCard>
                <ButtonsContainer>                                   
                    <MainButton type = {MainButtonType.Like}  onClick={()=>{likeHandler(beat.firestoreBeatID)}} text = {""+beat.likes} scale = {1}></MainButton>
                    <MainButton type = {MainButtonType.Copy} onClick={midiCopyHandler} text = "" scale = {1.03}></MainButton>
                </ButtonsContainer>
            </BeatParent>
        </OuterBox>)
    }


    return (
            <Feed>
                {
                    props.beats ? props.beats && props.beats.slice(0, props.offset + props.itemsOnFetch).map(feedElementCB)
                    : <img src="https://media.tenor.com/tga0EoNOH-8AAAAC/loading-load.gif"></img>
                }  
                <div ref={ props.targetRef}></div>                
            </Feed>
    )
}