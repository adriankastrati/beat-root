import { Beat, Beats } from "./FeedPresenter"

interface Props {
   beat: Beat
   beats: Beats
}

function FeedView(props: Props) {

    const FeedItem = ({composer: composer,
                        title: title,
                        glyph: glyph, 
                        avatar: avatar }: Beat) => {
        return (
         <li>
            <div>
                <div>
                    <h3>{composer}</h3>
                    <img src={avatar} />
                </div>
                <div>{title}
                    <h2>
                        {(glyph).map((n, i) => {
                            return <th key={i}>{n + ":"} </th>
                        })
                        }
                    </h2>
                </div>
            </div>
        </li>
        )
    }

    const FeedItems = ({ beats } : Beats) => {
        return (
            <ul>
                {beats.map(({composer, title, glyph, avatar, likes}) => (
                    <FeedItem
                    composer = {composer}
                    title= {title}
                    glyph= {glyph}
                    avatar= {avatar}
                    likes= {likes}
                    />
                ))}
            </ul>
        )
    }
    return (
        <div id="feed-parent">
            <FeedItems beats = {props.beats.beats}/>
        </div>
    )

}

//function OldFeedView(props: Props) {
//
//    const glyphs = props.beat.glyph
//    //const mappedTodosToRender = todos.map(({title})=>{<TitleCard key={title} title={title}/>;
//
//    // create array rendering
//    return (
//        //<body color={props.beat.theme} >
//            <div id="feed-parent">
//                <div id="post-visualizer-window"> 
//                        <p>composer: {props.beat.composer}</p>
//                        <p>likes: {props.beat.likes}</p>
//                        <p> glyphs:
//                            {(glyphs).map((n, i)=> {
//                                return <th key={i}>{n + ":"} </th>
//                            })
//                            }
//                        </p>
//                        <p>sample: {props.beat.samples}</p>
//                </div>
//            </div>
//    )
//}

export default FeedView