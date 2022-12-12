import ColorSchemeBox from "./common/ColorSchemeBox";
import { getColorRandomScheme } from "../../common/colorSource";
import styled from "styled-components";
import { textStyles, theme } from "../../common";
import React from "react";
import MainButton, { MainButtonType } from "./common/MainButton";
import { withRouter, RouteComponentProps, Route } from "react-router-dom";

const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:40px;
`
const InnerBox = styled.div`
  display:flex;
  flex-direction:column;
  margin:10px;
  padding: 10px;
  border: 1px solid ${theme.medium};
  width: 300px;
`
const TitleStyle = styled.div`
    font-size:18px;
    padding:2px;
    margin:0px;
`
const Center = styled.div`
align-items: center;
align-self: center;
margin: 0 auto;
`
const Justify = styled.div`
  display: flex;
  justify-content: center;
`
function ColorBoxView(props:RouteComponentProps) {
    const [colorArray, setColorArray] = React.useState<string[]>([]);
  
    React.useEffect(() => {
      async function colorCB() {
        const colorPromise: Promise<string[]> = getColorRandomScheme(4);
        const colors: string[] = await colorPromise.then((value) => value);
        setColorArray(colors);
      }
  
      colorCB();
    }, []);

    function redirect(){
        props.history.push('/play/create');
    }
  
    return (
      <OuterBox>
        <Center>
          <TitleStyle>Color Theme</TitleStyle>
          <InnerBox>
            <ColorSchemeBox colorArray={colorArray}></ColorSchemeBox>  
          </InnerBox>
          <Justify>
            <MainButton type ={MainButtonType.Plain} text="continue" scale = {1} width={100} onClick={redirect}></MainButton>
          </Justify>
        </Center>
      </OuterBox>
    );
  }
  
  export default withRouter(ColorBoxView);
  