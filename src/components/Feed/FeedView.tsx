import { Beat, Beats } from "./FeedPresenter"
import "./post-item.css"

interface Props {
   beats: Beats
}

function FeedView(props: Props) {

    const FeedItem = ({composer: composer,
                        title: title,
                        glyph: glyph, 
                        avatar: avatar,
                        likes: likes} : Beat) => {
        return (
            <div className="post-item">
                <div className="post-item-grid">
                    <div className= "post-item-beat-graphic">
                        <div className="post-item-beat-graphic-fake">
                            {(glyph).map((n, i) => {
                                return <th key={i}>{n + ":"} </th>
                            })}
                            <th>
                                <th>{title + "- "}{composer}</th>
                            </th>
                        </div>
                        
                    </div>
                    <button>{likes}</button>
                    <button>midi</button>
                    <img 
                        className="post-item-composer-avatar"
                        src={avatar} 
                       //sheiße
                        style={{width: 40,
                                height: 40,
                                borderRadius: 40 / 2 }} 
                    />
                </div>
            </div>
        )
    }

    // these might be passed from "FeedPresenter" instead
    const FeedItems = ({ beats } : Beats) => {
        return (
            <div id="feed-parent">
                {beats.map(({composer, title, glyph, avatar, likes}, i) => (
                    <FeedItem
                        composer = {composer}
                        title= {title}
                        glyph= {glyph}
                        avatar= {avatar}
                        likes= {likes}
                    />
                ))}
            </div>
        )
    }
    return (
        <body>
            <FeedItems beats = {props.beats.beats}/>
        </body>
    )

}

export default FeedView