
import * as Tone from "tone";
import { Sampler } from "tone";
import {Rhythm, Sample} from "../common";

export default class AudioModel {
    initialized: boolean = false
    samplers: Tone.Sampler[] = []
    samples = new Map<string,string>()

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
                    baseUrl: this.samples.get(sample),

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

    getSamples(){
        return Array.from(this.samples.keys())
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
        //should be successfully called once, at fist user generated event
        return Tone.start().then(async ()=>{
            return await mockGetSamples()
                .then(sample => sample.forEach(({name, url})=>this.samples.set(name, url))).then(()=>{
                    this.initialized = true
                })
        })
    }
}



function mockGetSamples():Promise<{name:string, url:string}[]>{
    return new Promise(resolve => setTimeout(resolve, 1000)).then(()=>{
        return [
            {
                name:"hihat.mp3",
                url:"https://tonejs.github.io/audio/drum-samples/Techno/hihat.mp3" //will be local urls
            },
            {
                name:"kick.mp3",
                url:"https://tonejs.github.io/audio/drum-samples/Techno/kick.mp3" //will be local urls
            }
        ] 
    })
}