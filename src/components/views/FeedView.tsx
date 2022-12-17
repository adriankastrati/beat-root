import React, { MutableRefObject } from "react"
import { Beat, theme } from "../../common"
import styled from "styled-components";
import MainButton, { MainButtonType } from "./common/MainButton";
import { BeatParent, ButtonsContainer, ThemedCard, UserTitle, BeatTitle } from "./common/FeedViewElements";
import BeatVisualisationPresenter from "../presenters/BeatVisualizationPresenter";
import { Link } from "react-router-dom";
import { BlankSpace } from "./common/NavBarElements";

const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin: 0px;
  margin-left: calc(3vw + 3vh);
  margin-right: calc(3vw + 3vh);
  overflow-x:hidden;
`
const Feed = styled.div`
    display: flex;
    flex-direction: row;   
    flex-wrap: wrap; 
    justify-content: center;
`
const SuspenseDiv = styled.div`
    z-index: 2;
`
const FetchDiv = styled.div`
    bottom: 0px;
`
const Image = styled.img`
width: 32px;
height: 32px;
`

interface FeedViewProps{
    isUser: boolean
    beats: Beat[]
    isLoading: boolean
    shouldFetch: boolean
    targetRef: MutableRefObject<HTMLDivElement | null>
    itemsOnFetch: number
    lastItem: string | undefined
    //setFeedSortedBy: (filter: React.FormEvent) => void
    onLikeBeat: (beatID: string, likes: number) => void
}


export default function FeedView(props:FeedViewProps){
    let userNamePlaceholder = "*username*"
    // need firebase functions for this
    function likeHandler(beatID: string, beat:Beat):void {
        props.onLikeBeat(beatID,beat.likes)
    }
    //function changeInFeedSortingHandler(filter: React.FormEvent):void {
    //    props.setFeedSortedBy(filter)
    //}

    function feedElementCB(beat: Beat, key: any){
        return (<OuterBox key={key}>
                    
                    <BeatParent> 
                        <BlankSpace height={30}></BlankSpace>
                        <BeatTitle>{beat.title}</BeatTitle>
                        <UserTitle offset={userNamePlaceholder.length}>{userNamePlaceholder}</UserTitle>
                        <BeatVisualisationPresenter
                            bpm={beat.bpm}
                            tracks={beat.tracks}
                            colorTheme={beat.theme}
                        />
                        <ButtonsContainer>                                   
                            {props.isUser?<MainButton type = {MainButtonType.Like}  onClick={()=>{likeHandler(beat.firestoreBeatID,beat)}} text = {""+beat.likes} scale = {0.5} frameOff={true} backgroundColor={theme.medium} borderRad={40} width={160} fontSize={18}></MainButton>:
                            <Link style={{ textDecoration: 'none' }} to="../sign-in">
                                 <MainButton type = {MainButtonType.Like}  onClick={()=>{likeHandler(beat.firestoreBeatID,beat)}} text = {""+beat.likes} scale = {0.5} frameOff={true} backgroundColor={theme.medium} borderRad={40} width={160} fontSize={18}></MainButton>
                            </Link>
                           }
                            {/*<MainButton type = {MainButtonType.Copy} onClick={midiCopyHandler} text = "" scale = {1.03}></MainButton>*/}
                        </ButtonsContainer>
                    </BeatParent>
                </OuterBox>
        )
    }

    return (
        <OuterBox>
            <Feed>
                {props.beats.map(feedElementCB)}
            </Feed>
            <Feed>
                {!props.targetRef? props.beats.slice(props.beats.length - props.itemsOnFetch, props.beats.length + props.itemsOnFetch).map(feedElementCB)
                    : <SuspenseDiv>
                            {props.isLoading? <Image src="https://i.ibb.co/P9L7QQ6/Pulse-1s-200px.gif"></Image>: ""}  
                        </SuspenseDiv>
                }
            </Feed>
            <FetchDiv ref={ props.targetRef }>
                End of feed
            </FetchDiv>
        </OuterBox>
    )
}