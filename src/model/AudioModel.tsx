
import { cloneDeep } from "lodash";
import * as Tone from "tone";
import { Sampler } from "tone";
import {Rhythm, Sample, Track} from "../common";
import { getSamples } from "./firebase/firebaseBeat";

export default class AudioModel {
    initialized: boolean = false
    samplers: Tone.Sampler[] = []
    samples = new Map<string,string>()
    playing = false

    play(tracks:Track[], bpm:number){ //TODO: Sample lookup table in initialized model. Sample is only a string
        this.clear()
        //create all samplers
        this.samplers = tracks.map(
            ({sample, rhythm}) => {
                let loopTime = 60*rhythm.steps/bpm
                //create sampler
                let sampler = new Sampler({
                    urls: {
                        A1: "",
                    },
                    baseUrl: this.samples.get(sample),

                    onload:()=>{
                        //schedule
                        console.log("play")
                        Tone.Transport.scheduleRepeat((time:number)=>{
                            console.log(rhythm.getNormalizedLoopSchedule())
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

        this.playing = true
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

        this.playing = false
    }

    init(){
        //should be successfully called once, at fist user generated event
        return Tone.start().then(async ()=>{
            return await getSamples() //TODO: remove !... Rertry if fail
                .then(sample => sample!.forEach(({name, url})=>this.samples.set(name, url))).then(()=>{
                    this.initialized = true
                })
        })
    }
}



// function mockGetSamples():Promise<{name:string, url:string}[]>{
//     return new Promise(resolve => setTimeout(resolve, 1000)).then(()=>{
//         return [
//             {
//                 name:"hihat.mp3",
//                 url:"https://tonejs.github.io/audio/drum-samples/Techno/hihat.mp3" //will be local urls
//             },
//             {
//                 name:"kick.mp3",
//                 url:"https://tonejs.github.io/audio/drum-samples/Techno/kick.mp3" //will be local urls
//             }
//         ] 
//     })
// }