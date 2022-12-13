import { Children, ReactNode, useContext, useState } from "react";
import ModelContext from "../../contexts/ModelContext";
import styled from "styled-components";

const MarginDiv = styled.div`
    margin: 40px;
`

export default function AudioInitializer(props:{children: ReactNode | ReactNode[]}){

    const {audioModel} = useContext(ModelContext)
    const [initialized, setInitialized] = useState(audioModel.initialized);

    return (<MarginDiv> {initialized ? 
                <div>{props.children}</div> :
                <button onClick={()=>audioModel.init().then(()=>setInitialized(true))}>initialize</button>}
            </MarginDiv>)
}