import { useEffect, useRef, useState } from "react";
import { Loop, Sampler, start, Synth, Transport, } from "tone";

function ToneJSExperiment() {
    const [cpm, setCpm] = useState(20)
    const [nums, setNums] = useState(new Set<number>())

    const sampler = useRef<Sampler|null>(null);
    const loop = useRef<Loop|null>(null);

    useEffect(()=>{
        //init sampler
        sampler.current = new Sampler({
            urls: {
                A2: "A2.mp3",
            },
            //baseUrl: "https://tonejs.github.io/audio/drum-samples/Stark/",
            baseUrl: "https://tonejs.github.io/audio/casio/",
        }).toDestination();

        //init loop by first update
        updateLoop()

        return () => {
        }
    })

    function getLoopTime(){
        return 60/cpm
    }

    function updateLoop(){
        //dispose old loop
        if (loop.current){
            loop.current.dispose()
        }

        const hits = Array.from(nums).map(n=>{ //for every rythm n
            return Array(n).fill(0).map((_,i)=>i*(getLoopTime()/n)) //schedule each hit
        }).flat()
        .filter((value, index, self)=>self.indexOf(value)===index) //unique only

        //create new loop
        loop.current = new Loop(time => {
            hits.forEach(hitTime => {
                if (sampler.current){
                    sampler.current.triggerAttackRelease("B2", "8n", time+hitTime);
                } else {
                    throw new Error("Sampler when trying to create loop")
                }
            })
        },getLoopTime()).start(0)

    }
    const play = () => {

    }

    const numsToChoose = [1,2,3,4,5,6,7,8,9,10,11,12,13];

    const toggleNum = (i:number) => {
        let newNums = new Set(nums);
        if (nums.has(i)){
            newNums.delete(i)
        } else {
            newNums.add(i)
        }

        
        setNums(newNums)
    }

   

    return (
        <div>
            <div>
                {
                    numsToChoose.map((i:number) => 
                    <li key={i}>
                        <button onClick={()=>toggleNum(i)} style={{ backgroundColor: !nums.has(i) ? "white" : "grey" }}>{i}</button>
                    </li>
                    )
                }
            </div>
            <button onClick={async()=>await start()}>init</button>
            <button onClick={()=>Transport.start()}>start</button>
            <button onClick={()=>Transport.stop()}>stop</button>
            <button onClick={()=>setCpm(Math.max(cpm-5, 5))}>cpm -</button>
                {cpm}
            <button onClick={()=>setCpm(cpm+5)}>cpm +</button>
            <div>obs cpm +- funkar inte så bra än</div>
        </div>
    );
}

export default ToneJSExperiment;
