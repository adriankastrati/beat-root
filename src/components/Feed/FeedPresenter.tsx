import { useEffect, useRef, useState } from "react";

import FeedView from "./FeedView";

export interface Beat {
    composer: string
    title: string
    glyph: number[]
    theme?: string
    samples?: string[]
    likes?: number
    avatar: string
    //rhythms?: Rhythm[] 
}

export interface Beats {
    beats: Beat[]
}


// App.tsx shoudn't need any props since feedpresenter will
//     fetch data from firebase. 
function FeedPresenter () { // prop stack 

    function createBeat() {

        let beat : Beat = {
                composer: "markymerk", 
                title: '\"sampel b33t :)\"',
                glyph:[1, 3, 19] ,
                likes: 13,
                samples: ["hihat.wav"],
                theme: "#37FA20",
                avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/113px-Elon_Musk_2015.jpg",
        }

        return beat
    }

    function createBeatArray() {

        let beat_arr: Beats = {beats: []}

        for (let i = 0; i < 10; i++) {
            beat_arr.beats.push(createBeat())
        }
        return beat_arr
    }

    let beat_array = createBeatArray()


    return (
        <div>
            <FeedView 
                beats = {beat_array}
            />
        </div>
    )
}


//function postShit() {
//    //const p0st = useRef<Post|null>(null)
//
//    const sampelf33d = new Feed();
//    const composer1 = ({
//        username: "muskrat19", 
//        user_avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/113px-Elon_Musk_2015.jpg"
//    })
//
//    sampelf33d.createPost({
//        title: "kewl beat :3",
//        composer: composer1,
//        likes: 2,
//        date: "2022-03-13: 17:59"
//    })
//
//    // how 2 create and render and entire post object?
//    // Create post object-dom
//    return (
//        <div>
//            {composer1.username} | 
//            <div>
//                <a href="#"><img alt="test" src={composer1.user_avatar}></img></a>
//            </div>
//        </div>
//    )
//
//}

// trash
//export class Feed {
//
//    beats: Beat[] = []
//    //composers: Composer[] = []
//    //interactions: Interaction[] = []
//
//    //public createComposer = 
//    //    (composer: Composer) => this.composers.push(composer)
//
//    //public createInteraction = //likes and midi-link
//    //    (interactions: Interaction) => this.interactions.push(interactions)
//
//    public createBeat = 
//        (beat: Beat) => this.beats.push(beat)
//
//}

export default FeedPresenter;
