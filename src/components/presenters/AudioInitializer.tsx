import { Children, ReactNode, useContext, useState } from "react";
import ModelContext from "../../contexts/ModelContext";



export default function AudioInitializer(props:{children: ReactNode | ReactNode[]}){

    const {audioModel} = useContext(ModelContext)
    const [initialized, setInitialized] = useState(audioModel.initialized);

    return initialized ? 
        <div>{props.children}</div> :
        <button onClick={()=>audioModel.init().then(()=>setInitialized(true))}>initialize</button>
}