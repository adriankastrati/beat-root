import { Beat } from "../../common"

interface FeedViewProps {
    beats: Beat[],
    loading: boolean,
}

const FeedView = (props: FeedViewProps) => {
    return (
            <div>
                <div> 
                    { props.beats ? 
                    props.beats && props.beats.map((beat, index) => {
                        return (
                            <div>
                                <div>
                                <p key={index}> index={index}
                                <strong>Title:</strong> {beat.title}<br />
                                <strong>Composer ID:</strong> {beat.composerID}<br />
                                <strong>Likes:</strong> {beat.likes}<br />
                                <strong>Theme:</strong> {beat.theme.join(',')}<br />
                                </p>
                                </div>
                            </div>
                        )
                    }): "loading..."} 
                </div>
            </div>
        )
}

export default FeedView