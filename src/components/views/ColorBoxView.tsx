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
  display:box;
  height: 400px;
  flex: none;
  overflow-y: scroll;
  flex-direction: column;
  margin:40px;
`
const InnerBox = styled.div`
  flex-direction:column;
  padding: 10px;
  border: 1px solid ${theme.medium};
  width: 300px;
`
const Center = styled.div`
  align-items: center;
  align-self: center;
  margin: 0 auto;
`
const BoxWrapper = styled.div`
  align-items: center;
  align-self: center;

`;


interface ColorBoxViewProps {
  themeArray: string[][]
  targetRef: MutableRefObject<HTMLDivElement | null>
  loading: boolean
}

function ColorBoxView(props: ColorBoxViewProps) {

  return (
    <BoxWrapper>
          <TitleStyle>Color Theme</TitleStyle>
      <OuterBox>
          {props.themeArray && 
          !props.loading? props.themeArray.map((theme, key) => {
              return (
                <InnerBox key={key}>
                  <ColorSchemeBox key={key} colorArray={theme}></ColorSchemeBox>
                </InnerBox> 
              )
            }) : <p>loading...</p> }
          <div ref={props.targetRef}>ref for scroll fetch</div>
      </OuterBox>
      <Center>
        <MainButton type={MainButtonType.Plain} text="continue" scale={1} width={100} onClick={()=>{}}></MainButton>
      </Center>
    </BoxWrapper>
    )
  }

  export default ColorBoxView
