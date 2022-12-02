
import * as Tone from "tone";
import { Sampler } from "tone";
import {Rhythm} from "../common";

export default class AudioModel {
    initialized: boolean = false
    samplers: Tone.Sampler[] = []

    play(samplesAndRythms:{sampleURL:string, rhythm:Rhythm}[], loopTime:number){
        if (!this.initialized){}
        this.clear()
        //create all samplers
        this.samplers = samplesAndRythms.map(
            ({sampleURL, rhythm}) => {

                //create sampler
                let sampler = new Sampler({
                    urls: {
                        A1: "",
                    },
                    baseUrl: sampleURL, 
                    //load samples once in model if it gets slow?

                    onload:()=>{
                        //schedule
                        Tone.Transport.scheduleRepeat((time:number)=>{
                            rhythm.getNormalizedLoopSchedule().forEach(hitTime => {
                                sampler.triggerAttackRelease("A1", "2", time + hitTime*loopTime);
                                    })
                        }, loopTime)
                    }

                }).toDestination()
                return sampler
            }
        )
        
        //start transport
        Tone.Transport.start(Tone.now())
    }

    clear(){
        //clear transport schedule
        Tone.Transport.cancel(0)
        //dispose all samplers
        this.samplers.forEach(sampler => {
            sampler.disconnect()
            sampler.dispose()
        })
        this.samplers = []
    }
    
    stop(){
        //clear
        this.clear()
        //stop transport
        Tone.Transport.stop()
    }

    init(){
        //should be called once, at fist user generated event
        return Tone.start().then(()=>{
            this.initialized = true
        })
    }
}