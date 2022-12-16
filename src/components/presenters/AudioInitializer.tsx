import { Children, ReactNode, useContext, useState } from "react";
import styled from "styled-components";
import ModelContext from "../../contexts/ModelContext";

const Wrapper = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    z-index:1000;
`


export default function AudioInitializer(props:{children: ReactNode | ReactNode[]}){

    const {audioModel} = useContext(ModelContext)
    const [initialized, setInitialized] = useState(audioModel.initialized);

    return initialized ? 
        <div>{props.children}</div> :
        <Wrapper onClick={()=>audioModel.init().then(()=>setInitialized(true))}>
            <h2>click anywhere to start</h2>
            
        </Wrapper>
}