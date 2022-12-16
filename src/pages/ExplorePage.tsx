import FeedPresenter from "components/presenters/FeedPresenter";
import ModelContext from "contexts/ModelContext";
import { useContext, useEffect } from "react";

export default function ExplorePage(){
    //clean up audiomodel on page change
    const {audioModel} = useContext(ModelContext)
    useEffect(()=>{
        return ()=>{ 
            audioModel.stop()
        }
    })

    return <FeedPresenter userFeed={false}/>
}