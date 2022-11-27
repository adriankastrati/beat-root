import { useEffect, useRef, useState } from "react";
import { Post, Composer, Interaction} from "./feedUnits"

export class Feed {

    posts: Post[] = []
    composers: Composer[] = []
    interactions: Interaction[] = []


    public createComposer = 
        (composer: Composer) => this.composers.push(composer)

    public createInteraction = //likes and midi-link
        (interactions: Interaction) => this.interactions.push(interactions)

    public createPost = 
        (post: Post) => this.posts.push(post)

}


function DrawFeed() {
    const [, setFeed] = useState()

    const p0st = useRef<Post|null>(null)

    const sampelf33d = new Feed();
    const composer1 = ({
        username: "muskrat71", 
        user_avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg'
    })
    const postInteractions = ({
        likes: 57, 
        midi_link: "midi_link"
    })

    sampelf33d.createPost({
        title: "kewl beat :3",
        composer: composer1,
        interactions: postInteractions,
        date: "2022-03-13: 17:59"
    })

    // how 2 create and render and entire post object?
    // Create post object-dom
    return (
        <div>
            {composer1.username} | 
            <div>
                <a href="google.com"><img alt="test" src={composer1.user_avatar}></img></a>
            </div>
            <p> {"<3: "} {postInteractions.likes}</p>
            <p>{postInteractions.midi_link}</p>
        </div>
    )

}


export default DrawFeed;
