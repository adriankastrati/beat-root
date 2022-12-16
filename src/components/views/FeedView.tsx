import { MutableRefObject } from "react"
import { Beat, theme } from "../../common"
import styled from "styled-components";
import MainButton, { MainButtonType } from "./common/MainButton";
import { BeatParent, ButtonsContainer, ThemedCard, UserTitle, BeatTitle } from "./common/FeedViewElements";
import BeatVisualisationPresenter from "../presenters/BeatVisualizationPresenter";
import { getUserInformation, UserInformation } from "model/firebase/firebaseAuthenticationModel";
const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin: 20px;
  margin-left: calc(3vw + 3vh);
  margin-right: calc(3vw + 3vh);
  overflow-x:hidden;
`
const Feed = styled.div`
    height: 95%;
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
    let userNamePlaceholder = "*username*"
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
                        <BeatTitle>{beat.title}</BeatTitle>
                        <UserTitle offset={userNamePlaceholder.length}>{userNamePlaceholder}</UserTitle>
                        <BeatVisualisationPresenter
                            bpm={beat.bpm}
                            tracks={beat.tracks}
                            colorTheme={beat.theme}
                        />
                        <ButtonsContainer>                                   
                            <MainButton type = {MainButtonType.Like}  onClick={()=>{likeHandler(beat.firestoreBeatID,beat.likes)}} text = {""+beat.likes} scale = {0.5} frameOff={true} backgroundColor={theme.medium} borderRad={40} width={160} fontSize={18}></MainButton>
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
                            {props.isLoading? "loading": ""}  
                        </SuspenseDiv>
                }
            </Feed>
            <FetchDiv ref={ props.targetRef }>
                ...that's all she wrote
            </FetchDiv>
        </OuterBox>
    )
}