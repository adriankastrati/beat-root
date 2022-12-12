import { MutableRefObject } from "react"
import { Beat } from "../../common"
import { likeBeatAsUser, isBeatLikedByCurrentUser } from "../../model/firebase/firebaseBeat"
import {BeatParent, ThemedCard,ButtonsContainer, CardButton} from "../../components/views/common/feedViewElements"
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

    

    // this should be in the view instead, but I can't seem to figure out how
    //  to send the props in a way that allows for intersection observing with refs
    //  like below
    // 
    return (
            <div>
                <div> 
                    {props.beats ? 
                        props.beats && props.beats.slice(0, props.offset + props.itemsOnFetch).map((beat, key) => {
                        //console.log("loadin:" + loading)
                        return (
                                <BeatParent key={key}> 

                                    <ThemedCard color={beat.theme[0][0]}>
                                    <div>{beat.firestoreBeatID}</div>

                                        <p> fetch index={key}<br/>
                                        <strong></strong> {beat.title} by: <strong>{beat.composerID}user</strong><br />
                                        <strong>Theme:</strong> {beat.theme.join(',')}<br />
                                        </p>

                                    </ThemedCard>
                                    <ButtonsContainer>                                        
                                    <CardButton onClick={()=>{likeHandler(beat.firestoreBeatID)}
                                            }>{beat.likes}</CardButton>
                                        <CardButton onClick={midiCopyHandler}>midi</CardButton>
                                    </ButtonsContainer>
                                </BeatParent>
                        )
                    }):<img src="https://media.tenor.com/tga0EoNOH-8AAAAC/loading-load.gif"></img>}  
                    <div ref={ props.targetRef}></div>
                </div>
            </div>
    )
}