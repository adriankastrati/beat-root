import styled from "styled-components";
const ColorBox = styled.div<Color>`
  background-color: ${props => props.boxColor};
  border-radius: 0px;
  border: 0px solid red;
  width: ${props => props.width};
  height: 30px;
  padding: 2px;
`;
interface Color{
    boxColor: string
    width:string
}
const SchemeBox = styled.div`
  display:flex;
  overflow:hidden;
  padding:0px;
  border: 1px solid black;
  border-radius:6px;
  width: 100%;
`

interface Props{
    colorArray: string[]
}

function ColorSchemeBox(props:Props){
    let c_id = 0;
    
    function ColorBoxCB(color:string){
        c_id++;
        return <ColorBox boxColor={color} 
                         width={100/props.colorArray.length+"%"}
                         key={c_id}></ColorBox>
    }
    

    return <SchemeBox>{props.colorArray.map(ColorBoxCB)}</SchemeBox>
}
export default ColorSchemeBox