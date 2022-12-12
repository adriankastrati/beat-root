
import * as Tone from "tone";
import { Sampler } from "tone";
import {Rhythm, Sample} from "../common";

export default class AudioModel {
    initialized: boolean = false
    samplers: Tone.Sampler[] = []

    play(samplesAndRythms:{sample:Sample, rhythm:Rhythm}[], loopTime:number){ //TODO: Sample lookup table in initialized model. Sample is only a string
        if (!this.initialized){}
        this.clear()
        //create all samplers
        this.samplers = samplesAndRythms.map(
            ({sample, rhythm}) => {

                //create sampler
                let sampler = new Sampler({
                    urls: {
                        A1: "",
                    },
                    baseUrl: "https://tonejs.github.io/audio/drum-samples/Techno/hihat.mp3",//TODO 

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
            this.initialized = true //TODO then load all blobs into state
        })
    }
}