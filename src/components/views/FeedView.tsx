import React, { MutableRefObject } from "react"
import { Beat, textStyles, TextVariant, theme } from "../../common"
import styled from "styled-components";
import MainButton, { MainButtonType } from "./common/MainButton";
import { BeatParent, ButtonsContainer, ThemedCard, UserTitle, BeatTitle } from "./common/FeedViewElements";
import BeatVisualisationPresenter from "../presenters/BeatVisualizationPresenter";
import { Link } from "react-router-dom";
import { BlankSpace } from "./common/NavBarElements";
import { FeedItem } from "components/presenters/FeedPresenter";
import { InnerBox } from "./SignInView";

const Select = styled.select`
    display: flex;
    flex-direction: column;
    align-items-center;
    direction: ltr;
    padding: 3px;
    border-radius: 5px;
    border: 1px solid ${theme.medium};
    font-style:italic;
    width: 115px;
    font-size:17px;

`

const Refresh = styled.button`

`


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
    isUser: null|string
    beats: FeedItem[]
    isLoading: boolean
    shouldFetch: boolean
    targetRef: MutableRefObject<HTMLDivElement | null>
    itemsOnFetch: number
    lastItem: string | undefined
    setFeedSortedBy: (filter: string) => void
    feedSortedBy: string
    onLikeBeat: (beatID: string, likes: number) => void
    onRefresh?: ()=> void
}


export default function FeedView(props:FeedViewProps){

    function likeHandler(beatID: string, beat:Beat):void {
        props.onLikeBeat(beatID,beat.likes)
    }
    
    function feedElementCB(beat: FeedItem, key: any){
        return (<OuterBox key={key}>
                    
                    <BeatParent> 
                        <BlankSpace height={30}></BlankSpace>
                        <BeatTitle>{beat.beat.title}</BeatTitle>
                        <UserTitle offset={10}>{beat.composerInformation.username}</UserTitle>
                        <BeatVisualisationPresenter
                            bpm={beat.beat.bpm}
                            tracks={beat.beat.tracks}
                            colorTheme={beat.beat.theme}
                        />
                        <ButtonsContainer>                                   
                           {props.isUser?(beat.isLiked?
                                <MainButton type = {MainButtonType.Liked} padding={5} onClick={()=>{likeHandler(beat.beat.firestoreBeatID,beat.beat)}} text = {""+beat.beat.likes} scale = {0.5} frameOff={true} backgroundColor={theme.medium} borderRad={40} width={160} fontSize={18}></MainButton>:
                                <MainButton type = {MainButtonType.NotLiked} padding={5} onClick={()=>{likeHandler(beat.beat.firestoreBeatID,beat.beat)}} text = {""+beat.beat.likes} scale = {0.5} frameOff={true} backgroundColor={theme.medium} borderRad={40} width={160} fontSize={18}></MainButton>
                            ):
                           
                            <Link style={{ textDecoration: 'none' }} to="../sign-in">
                                 <MainButton type = {MainButtonType.NotLiked}  onClick={()=>{likeHandler(beat.beat.firestoreBeatID,beat.beat)}} text = {""+beat.beat.likes} scale = {0.5} frameOff={true} backgroundColor={theme.medium} borderRad={40} width={160} fontSize={18}></MainButton>
                            </Link>
                           }
                        </ButtonsContainer>
                    </BeatParent>
                </OuterBox>
        )
    }

    return (
        <OuterBox>
            <InnerBox flexDir="row">
                {props.onRefresh?
                <MainButton type={MainButtonType.Refresh} onClick={props.onRefresh} scale={0.6}></MainButton>
                :undefined
                }
                <BlankSpace width={15}></BlankSpace>
                <Select onChange={e=>props.setFeedSortedBy(e.target.value)} value={props.feedSortedBy}>
                    <option value="recent">recent</option>            
                    <option value="likes">most liked</option>            
                    
                </Select>
                
            </InnerBox>
            <Feed>
                {props.beats.map(feedElementCB)}
            </Feed>
            <Feed>
                {!props.targetRef? props.beats.slice(props.beats.length - props.itemsOnFetch, props.beats.length + props.itemsOnFetch).map(feedElementCB)
                    :<SuspenseDiv>
                            {props.isLoading? <Image src="https://firebasestorage.googleapis.com/v0/b/beat-root-a8d72.appspot.com/o/about%2FSpin-1.8s-190px.gif?alt=media&token=3b89dc77-08ec-43cc-a2ca-129904e1f740"></Image>: ""}  
                    </SuspenseDiv>
                }
            </Feed>
            <FetchDiv ref={ props.targetRef }>

                {/*add end of feed*/}
            </FetchDiv>
        </OuterBox>
    )
}