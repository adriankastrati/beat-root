import {useState, useEffect, useRef, useInsertionEffect} from "react"
import { useIntersection } from "react-use"
import { getColorRandomScheme } from "../../common/colorSource"
import ColorBoxView from "../views/ColorBoxView"

const ColorBoxPresenter = () => {
    const [themeArray, setThemeArray] = useState<string[][]>([])       // array of bars
    const [shouldFetch, setShouldFetch] = useState(false)
    const [rerender, setRerender] = useState(new Object())

    const targetRef = useRef<HTMLDivElement | null>(null) // null might be the root of issues
    const intersection = useIntersection(targetRef, {
        root:null,
        rootMargin: '200px',
        threshold: 1.0,
    })
    const AMOUNT_FETCHES = 10

    useEffect(() => {
        if (intersection?.isIntersecting && !shouldFetch) {
            setShouldFetch(true)
        }

    },[intersection])

    useEffect(()=>{
        if (shouldFetch) {
            //fetch one time
            Promise.all( new Array(AMOUNT_FETCHES).fill(0).map(()=>getColorRandomScheme(Math.floor(Math.random()*5+1))))
            .then(newStuff => {
                setThemeArray([
                    ...themeArray,
                    ...newStuff
                ])})
        } else{
            setRerender(new Object) // ?
        }
        setShouldFetch(false)
        }

        , [shouldFetch])

    return (
        <ColorBoxView 
            themeArray = { themeArray }
            targetRef = { targetRef }
            loading = { false}//TODO
        />
    )
}

export default ColorBoxPresenter