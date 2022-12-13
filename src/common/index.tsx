import AudioModel from "../model/AudioModel";

export interface User{
    firestoreUserID: string,
    username: string,
}

export type Sample = string

export interface Track{
    rhythm:Rhythm,
    sample:Sample,
}

export interface Beat{
    firestoreBeatID:string
    composerID: string,     //user ID
    title: string,
    description: string,
    theme: string[],
    tracks: Track[],
    likes: number,
    bpm: number
}

function gcd(a:number, b:number):number {
    //not very effient, however ok for b <= 32 (only used in this file) 
    if (!b) {
      return a;
    }
  
    return gcd(b, a % b)
}

export const MAX_STEPS = 32

function euclideanRhythm(pulses:number, steps:number){ //TODO: test that this implementation is correct
    let a: any[] = new Array(pulses).fill(true)
    let b: any[] = new Array(steps-pulses).fill(false)
    let c: any[] = []
    function moveIteration(){
        while(true){
            c.push([a.pop(), b.pop()])

            if(a.length === 0){
                a = c
                c = []
                break
            }

            if(b.length === 0){
                b = c
                c = []
                break
            }
        }
    }

    while(true){
        if (b.length === 0) return a.flat(100) //TODO: what is maximum??
        if (a.length === 0) return b.flat(100)
        moveIteration()
    }
}

export class Rhythm {
    steps: number
    pulses: number
    shift: number //TODO: add functionality

    constructor(steps: number){
        this.steps = steps
        this.pulses = 1
        this.shift = 0
    }

    getPossibleEventNumbers():number[]{
        return Array(this.steps).fill(0).map((_,i)=>i+1)
            .filter(n => gcd(this.steps,n)===1)
    }

    getNormalizedLoopSchedule():number[]{
        return euclideanRhythm(this.pulses, this.steps).map((s,i) => s ? i/this.steps : null).filter(e => e !== null) as number[]
    }
}

export const theme = {
    white: "#FFFFFF",
    light: "#F1F2F2",
    medium: "#D1D3D4",
    dark: "#939598",
    black: "#000000",
}

export const defaultSample: Sample = "hihat.mp3" //TODO: change to real name

export function playTracks(tracks:Track[], bpm:number, audioModel:AudioModel){
    audioModel.play(
        tracks.map(({sample, rhythm})=>({sample, rhythm})), bpm)
}

export enum TextVaiant{
    BODY,
    TITLE,
    SUBTITLE
}

export function textStyles(variant:TextVaiant){
    switch (variant) {
        case TextVaiant.BODY:
            return`
                font-family: 'Helvetica', 'Arial', sans-serif;
                font-size:15px;
            `

        case TextVaiant.TITLE:
            return`
                font-weight: bold;
                font-family: 'Helvetica', 'Arial', sans-serif;
                font-size:30px;
            `

        case TextVaiant.SUBTITLE:
            return`
                font-weight: bold;
                font-family: 'Helvetica', 'Arial', sans-serif;
                font-size:20px;
            `
    }
}