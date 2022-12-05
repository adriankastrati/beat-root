import { Suspense, useEffect, useState, useRef, Fragment} from "react"
import {useIntersection } from 'react-use'
import { Beat } from "../../common"
import styled, {StyledComponent} from "styled-components"

    const ThemedCard: StyledComponent<'div', {color: string}> = styled.div`
    width: 400px;
    height: 450px;
    border-radius: 5%;
    position: relative;
    display: flex;
    background-color: ${(props) => props.color};
    //background-color: rgb(176, 115, 255);
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
    

function generateBeats(num: Number): Beat[] {
    const beats: Beat[] = [];
    for (let i=0; i < num; i++) {
        beats.push({
            composerID: "markymerk", 
            title: "kewl beat uwu",
            likes: 42,
            theme: ["#37FA20", "#55B55A"],
        })
    }
    return beats;
}

async function fakeBeatFetch<T>(num: Number): Promise<Beat[]>{ // <T> for future usage 
    return new Promise(resolve => setTimeout(resolve, 1000))
    .then(() => {
        return generateBeats(num)
    })
}

export const ITEMS_ON_FETCH = 5

const FeedPresenter = () => {

    const [beats, setBeats] = useState<Beat[]>([]) //might be | null?
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const targetRef = useRef<HTMLDivElement | null>(null)

    const intersection = useIntersection(targetRef, {
        root:null,
        rootMargin: '500px',
        threshold: 0.7
    });


    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const data = await fakeBeatFetch(ITEMS_ON_FETCH)
            setBeats((prevBeats) => prevBeats.concat(data) )
            setLoading(false)
        }

    
        if (intersection && intersection.isIntersecting ) {
            setPage(page + ITEMS_ON_FETCH)
            fetchData()
        }
    }, [intersection]) // intersection observer will only act on change

    // this should be in the view instead, but I can't seem to figure out how
    //  to send the props in a way that allows for intersection observing with refs
    //  like below
    return (
            <div>
                <div> 
                    { beats ? 
                        beats && beats.slice(0, page + ITEMS_ON_FETCH).map((beat, index) => {
                        console.log(intersection?.isIntersecting)
                        //console.log("loadin:" + loading)
                        return (
                            <div>
                                <div>
                <ThemedCard color={beat.theme[0]}>
                                <p key={index}> index={index}
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