import BeatCreatePresenter from "components/presenters/BeatCreatePresenter";
import ModelContext from "contexts/ModelContext";
import { useContext, useEffect } from "react";

export default function CreatePage(){
    //clean up audiomodel on page change
    //TODO: add this to all pages under /play :)
    const {audioModel} = useContext(ModelContext)
    useEffect(()=>{
        return ()=>{ 
            audioModel.stop()
        }
    })

    return <BeatCreatePresenter/>
}