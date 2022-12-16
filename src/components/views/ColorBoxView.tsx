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


interface ColorBoxViewProps {
  themeArray: string[][]
  targetRef: MutableRefObject<HTMLDivElement | null>
  loading: boolean
  chosen:number|null
  onSetChosen:(index:number)=>void
  onContinue:()=>void
}

function ColorBoxView(props: ColorBoxViewProps) {

  return (
            <BoxWrapper>
                  <TitleStyle>Color Theme</TitleStyle>
              <OuterBox>
                  {props.themeArray && 
                  !props.loading? props.themeArray.map((theme, key) => {
                      return (
                        <InnerBox key={key} onClick={()=>{props.onSetChosen(key)}}
                          style={{backgroundColor:props.chosen === key ? "gray":"white"}}
                        >
                          <ColorSchemeBox key={key} colorArray={theme}></ColorSchemeBox>
                        </InnerBox> 
                      )
                    }) : <p>loading...</p> }
                  <div ref={props.targetRef}>ref for scroll fetch</div>
              </OuterBox>
              
                <MainButton type={MainButtonType.Plain} text="continue" scale={1} width={100} 
                onClick={props.onContinue}/>
            </BoxWrapper>
    )
  }

  export default ColorBoxView
