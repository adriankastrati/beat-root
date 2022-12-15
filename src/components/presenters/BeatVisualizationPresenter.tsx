import { theme, Track } from "../../common";
import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import ModelContext from "../../contexts/ModelContext";

interface BeatVisualisationPresenterProps{
    tracks: Track[],
    bpm: number,
    colorTheme: string[]
}

const Center = styled.div`
align-self: center;
align-items: center;
`
const OuterBox = styled.div`
  display:flex;
  flex-direction:column;
`

const CanvasWrapper = styled.div`
    width:100%;
`

const VisCanvas = styled.canvas`

`

enum MarkerType{
    Pulse,
    Gap,
    Current
}

function drawMarker(markerType:MarkerType, steps:number, place:number){

}

function polar(r:number, phi:number):{x:number, y:number}{
    return {
        x:r*Math.cos(phi),
        y:r*Math.sin(phi),
    }
}

export default function BeatVisualisationPresenter(props:BeatVisualisationPresenterProps){
    const {audioModel} = useContext(ModelContext)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [drawContext, setDrawContext] = useState<CanvasRenderingContext2D | null>(null)
    const [step, setStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const timer = useRef<NodeJS.Timer>()

    useEffect(()=>{
        if (canvasRef.current && wrapperRef.current){
            //init
            canvasRef.current.width = wrapperRef.current.clientWidth;
            canvasRef.current.height = wrapperRef.current.clientWidth;

            setDrawContext(canvasRef.current.getContext("2d"))
            
        }
    },[canvasRef.current, wrapperRef.current])

    useEffect(()=>{
        if(isPlaying){
            timer.current = setInterval(()=>{
                setStep(prev => prev+1)
            }, 1000*60/props.bpm)

        } else {

            //cancel timeout cycle
            if (timer.current){
                clearInterval(timer.current)
            }

            setStep(0)
        }
    },[isPlaying])

    useEffect(()=>{
        if (!audioModel.playing){
            //stop due to external event
            pause()
        }
    },[audioModel.playing])

    useEffect(()=>{
        if (drawContext) {
            draw()
        }
    },[step, props.tracks, props.colorTheme])

    useEffect(()=>{ //initial draw
        if (drawContext){
            draw()
        }
    },[drawContext])

    function play(){
        audioModel.play(props.tracks, props.bpm)
        setIsPlaying(true)
    }

    function pause(){
        audioModel.stop()
        setIsPlaying(false)
    }


    function draw(){ 
        //Can only be used after init of drawContext

        let ctx = drawContext!
        let w = canvasRef.current!.width
        let h = canvasRef.current!.height

        let maxTracks = 5

        //clear
        ctx.clearRect(0, 0, w, h);
        
        //draw the rings
        props.tracks.forEach((track,i)=>{
            let outerRadius = (w/2 )*((maxTracks+1-i)/(maxTracks+1))
            let innerRadius = (w/2)*((maxTracks-i)/(maxTracks+1))

            ctx.beginPath()
            ctx.arc(w/2, h/2, outerRadius, 0, 2 * Math.PI, false)
            ctx.fillStyle = props.colorTheme[i%props.colorTheme.length]
            ctx.fill()  
            ctx.closePath()
        })

        //draw the markers
        props.tracks.forEach((track,i)=>{
            let outerRadius = (w/2 )*((maxTracks+1-i)/(maxTracks+1))
            let innerRadius = (w/2)*((maxTracks-i)/(maxTracks+1))

            let markerMargin = (outerRadius-innerRadius)*0.2

            //dot each step
            Array(track.rhythm.steps).fill(0).forEach((_,j)=>{
                let {x, y} = polar(
                    (outerRadius+innerRadius)/2, 
                    j*Math.PI*2/track.rhythm.steps
                )

                x += w/2
                y += h/2
                
                ctx.beginPath()
                ctx.arc(x, y, markerMargin/2, 0, 2 * Math.PI, false)
                ctx.fillStyle = theme.white
                ctx.fill()  
                ctx.closePath()

            })

            //mark pulses
            track.rhythm.getNormalizedLoopSchedule().forEach((pulseTime)=>{

                let from = polar(
                    innerRadius, 
                    pulseTime*Math.PI*2
                )

                let to = polar(
                    outerRadius - markerMargin*2, 
                    pulseTime*Math.PI*2
                )

                from.x += w/2
                from.y += h/2
                to.x += w/2
                to.y += h/2

                ctx.beginPath()
                ctx.arc(from.x, from.y, 1.5*markerMargin, 0, 2 * Math.PI, false)
                ctx.fillStyle = props.colorTheme[i%props.colorTheme.length]
                ctx.fill()
                ctx.closePath()

                ctx.beginPath()
                ctx.moveTo(from.x, from.y)
                ctx.lineTo(to.x, to.y);
                ctx.lineWidth = markerMargin
                ctx.strokeStyle = theme.white
                ctx.lineCap = "round"
                ctx.stroke()
            })

            //mark current
            let {x, y} = polar(
                (outerRadius+innerRadius)/2, 
                step*Math.PI*2/track.rhythm.steps
            )

            x += w/2
            y += h/2

            ctx.beginPath()
            ctx.arc(x, y, 1.25*markerMargin, 0, 2 * Math.PI, false)
            ctx.fillStyle = theme.white
            ctx.fill()
            ctx.closePath()

            ctx.beginPath()
            ctx.arc(x, y, 0.75*markerMargin, 0, 2 * Math.PI, false)
            ctx.fillStyle = props.colorTheme[i%props.colorTheme.length]
            ctx.fill()
            ctx.closePath()
        })

    }

    return <OuterBox>
        <CanvasWrapper ref={wrapperRef}>
        <VisCanvas
                ref={canvasRef}
        /> 
        </CanvasWrapper>

        {/* <button onClick={draw}> draw! </button> */}
        <button onClick={()=>isPlaying ? pause(): play()}> play/pause </button>       
       
    </OuterBox>
}