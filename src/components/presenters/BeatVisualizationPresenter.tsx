import { Beat, Track } from "../../common";
import MainButton, { MainButtonType } from "../views/common/MainButton";
import image from '../../placeholder.png'
import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import ModelContext from "../../contexts/ModelContext";

interface BeatVisualisationPresenterProps{
    tracks: Track[],
    bpm: number
}

const Center = styled.div`
align-self: center;
align-items: center;
`
const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
`

export default function BeatVisualisationPresenter(props:BeatVisualisationPresenterProps){
    const {audioModel} = useContext(ModelContext)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [drawContext, setDrawContext] = useState<CanvasRenderingContext2D | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(()=>{
        if (canvasRef){
            //init draw context
            setDrawContext(canvasRef.current!.getContext("2d"))
        }
    },[canvasRef])

    function play(){
        console.log(props.tracks)
        audioModel.play(props.tracks, props.bpm)
        setIsPlaying(true)
    }

    function pause(){
        audioModel.stop()
        setIsPlaying(false)
    }


    function draw(){
        let ctx = drawContext!

        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }

    return <OuterBox>
        {
        canvasRef ?  
            <canvas
                ref={canvasRef}
            /> 
            : "loading canvas..."
        }

        <button onClick={draw}> draw! </button>
        <button onClick={()=>play()}> play </button>
        <button onClick={()=>pause()}> pause </button>        
       
    </OuterBox>
}