import React from "react"
import { getColorRandomScheme } from "../common/colorSource"
export default function ColorTestPage(){
    const [colors,setColors] = React.useState<string[]>()

    async function getColorScheme(){
        getColorRandomScheme(5).then(color=>{
            setColors(color)
        })
        renderColor()
    }

    function renderColor(){
        return(
            colors?.map((color, keyid) => {
                return <div key={keyid} style={{backgroundColor:color}}> pasta</div>
            })
        );
    }

    return (
    <div>
        <button onClick={getColorScheme}>getcolor</button>
        {renderColor()}{renderColor()}{renderColor()}{renderColor()}{renderColor()}
    </div>
  )
    
}

