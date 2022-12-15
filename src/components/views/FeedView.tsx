import { MutableRefObject } from "react"
import { Beat } from "../../common"
import styled from "styled-components";
import MainButton, { MainButtonType } from "./common/MainButton";
import { BeatParent, ButtonsContainer, ThemedCard } from "./common/FeedViewElements";
import BeatVisualisationPresenter from "../presenters/BeatVisualizationPresenter";

const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:20px;
`
const Feed = styled.div`
    height: 95%;
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
const FeedWrapper = styled.div`
    height: 100%;
`
const SuspenseDiv = styled.div`
    z-index: 2;
`
const FetchDiv = styled.div`
    bottom: 0px;
`

interface FeedViewProps{
    beats: Beat[]
    isLoading: boolean
    shouldFetch: boolean
    targetRef: MutableRefObject<HTMLDivElement | null>
    itemsOnFetch: number
    lastItem: string | undefined
    onLikeBeat: (beatID: string, likes: number) => void
}

export default function FeedView(props:FeedViewProps){

    // need firebase functions for this
    function likeHandler(beatID: string, likes:number):void {
        props.onLikeBeat(beatID,likes)
    }

    function midiCopyHandler():void {
        console.log("copied midi(jk)")
    }
    function feedElementCB(beat: Beat, key: any){
        return (<OuterBox key={key}>
            <BeatParent> 

                <BeatVisualisationPresenter
                    bpm={beat.bpm}
                    tracks={beat.tracks}
                    colorTheme={beat.theme}
                />
                <ButtonsContainer>                                   
                    <MainButton type = {MainButtonType.Like}  onClick={()=>{likeHandler(beat.firestoreBeatID,beat.likes)}} text = {""+beat.likes} scale = {1}></MainButton>
                    <MainButton type = {MainButtonType.Copy} onClick={midiCopyHandler} text = "" scale = {1.03}></MainButton>
                </ButtonsContainer>
            </BeatParent>
        </OuterBox>
        )
    }

    return (
        <Center>
            <Feed>
                {props.beats.map(feedElementCB)}
            </Feed>
            <Feed>
                {!props.targetRef? props.beats.slice(props.beats.length - props.itemsOnFetch, props.beats.length + props.itemsOnFetch).map(feedElementCB)
                    : <SuspenseDiv>
                            {props.isLoading? "loading": ""}  
                        </SuspenseDiv>
                }
            </Feed>
            <FetchDiv ref={ props.targetRef }>
                ...that's all she wrote
            </FetchDiv>
        </Center>
    )
}