import ColorSchemeBox from "./common/ColorSchemeBox";
import { getColorRandomScheme } from "../../common/colorSource";
import styled from "styled-components";
import { textStyles, theme } from "../../common";
import { MutableRefObject } from "react";
import MainButton, { MainButtonType } from "./common/MainButton";

const TitleStyle = styled.div`
    font-size:18px;
    padding:2px;
    margin:0px;
`
const OuterBox = styled.div`
  display:flex;
  height: 450px;
  overflow-y: scroll;
  flex-direction: column;
  margin:40px;
  width: 60%;
  align-items:center;
`
const InnerBox = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  padding: 10px;
  border: 1px solid ${theme.medium};
  width: 80%;
`
const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`
const SuspenseDiv = styled.div`
  z-index: 10;
`
const FetchDiv = styled.div`
  bottom: 0px;
`


interface ColorBoxViewProps {
  themeArray: string[][]
  targetRef: MutableRefObject<HTMLDivElement | null>
  loading: boolean
  itemsOnFetch: number
  chosen:number|null
  onSetChosen:(index:number)=>void
  onContinue:()=>void
}


function ColorBoxView(props: ColorBoxViewProps) {
  function themesCB(theme: string[], key: number){
    return (
          <InnerBox key={key} onClick={()=>{props.onSetChosen(key)}}style={{backgroundColor:props.chosen === key ? "gray":"white"}}>
            <ColorSchemeBox key={key} colorArray={theme}></ColorSchemeBox>
          </InnerBox> )
  }

  return (
            <BoxWrapper>
                  <TitleStyle>Color Theme</TitleStyle>
              <OuterBox>
                  {props.themeArray.map(themesCB)}
                  {!props.loading? 
                  props.themeArray
                  .slice(props.themeArray.length - props.itemsOnFetch, props.themeArray?.length + props.itemsOnFetch)
                  .map(themesCB) 
                  : <SuspenseDiv>
                        {props.loading? <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rotating_earth_%28large%29.gif/100px-Rotating_earth_%28large%29.gif"></img>:""}
                    </SuspenseDiv>
                  }
                  <FetchDiv ref={props.targetRef}>ref for scroll fetch</FetchDiv>
              </OuterBox>
              
                <MainButton type={MainButtonType.Plain} text="continue" scale={1} width={100} 
                onClick={props.onContinue}/>
            </BoxWrapper>
    )
  }

  export default ColorBoxView
