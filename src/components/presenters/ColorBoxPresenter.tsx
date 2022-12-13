import {useState, useEffect, useRef, useInsertionEffect} from "react"
import { RouteComponentProps } from "react-router-dom"
import { useIntersection } from "react-use"
import { getColorRandomScheme } from "../../common/colorSource"
import ColorBoxView from "../views/ColorBoxView"
import ColorSchemeBox from "../views/common/ColorSchemeBox"


// small problem: new fetches might hold already fetched colors
// medium problem: I need to render multiple ColorBoxes
// larger problems: re-fetch on which threshold? All items are visible atm
const ColorBoxPresenter = () => {
    const [colorArray, setColorArray] = useState<string[]>([]) // single bar of colors
    const [themeArray, setThemeArray] = useState<string[][]>([])       // array of bars
    //const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)

    const targetRef = useRef<HTMLDivElement | null>(null)
    const intersection = useIntersection(targetRef, {
        root:null,
        rootMargin: '200px',
        threshold: 1.0,
    })

    const AMOUNT_COLORS = 4
    const AMOUNT_FETCHES = 1

    function fetchThemes() {
        setLoading(true)

        getColorRandomScheme(AMOUNT_COLORS) // returns [#, #, #, #]
        .then((theme) => {if(theme){
            themeArray.push(theme)
            setThemeArray(themeArray) 
            console.log("setting themes:", themeArray)
        }else {
            console.log("response: ", theme)
        }})


        console.log(themeArray)
        //setThemeArray(themeArray.concat(colorArray))
        setLoading(false)
    }

    useEffect(() => {
        if (intersection?.isIntersecting && !loading) {
            console.log("intersecting!")
            //setOffset(offset + AMOUNT_FETCHES)
            fetchThemes()
            if ( colorArray.keys.length == 0) {
                console.log("there are no themes, fetching...")
                fetchThemes()
            } else {
                console.log("there are themes")
                return
            }
        }

    },[intersection?.isIntersecting])

    return (
        <ColorBoxView 
            //themeArray = { themeArray }
            //targetRef = { targetRef }
            //loading = { loading }
        />
    )
}

export default ColorBoxPresenter