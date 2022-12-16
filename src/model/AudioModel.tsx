
import { cloneDeep, reject } from "lodash";
import * as Tone from "tone";
import { Sampler } from "tone";
import {Rhythm, Sample, Track} from "../common";
import { getSamples } from "./firebase/firebaseBeat";

export default class AudioModel {
    initialized: boolean = false
    samplers: Tone.Sampler[] = []
    samples = new Map<string,string>()
    nextID = 0
    playingID:number|null = null

    playTracks(tracks:Track[], bpm:number):Promise<number>{

        this.stop()
        const id = this.nextID
        this.playingID = id
        this.nextID += 1

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
                        Tone.Transport.scheduleRepeat((time:number)=>{
                            rhythm.getNormalizedLoopSchedule().forEach(hitTime => {
                                sampler.triggerAttackRelease("A1", "3", time + hitTime*loopTime);
                                    })
                        }, loopTime)

                    }

                }).toDestination()
                return sampler
            }
        )

        return Tone.loaded().then(()=>{
            Tone.Transport.start()
            return id
        })

    }

    getSamples(){
        return Array.from(this.samples.keys())
    }

    private clear(){
        //clear transport schedule
        Tone.Transport.cancel(0)
        //dispose all samplers
        this.samplers.forEach(sampler => {
            sampler.disconnect()
            sampler.dispose()
        })
        this.samplers = []
    }
    
    stop(id?:number){
        if (id !== undefined){
            if (id !== this.playingID){
                return
            }
        }

        //clear
        this.clear()
        //stop transport
        Tone.Transport.stop()

        this.playingID = null
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