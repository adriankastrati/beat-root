import {Auth} from "firebase/auth"
import AudioModel from "../model/AudioModel";
export const MAX_GLYPH = 32;

export interface User{
    firestoreUserID: string,
    username: string,
}

export interface Sample{
    firestoreSampleID:string,
    name: string,
    url: string,
}

enum EffectVariant{
    BIN = "bin",
    OFFSET = "offset"
}

export interface Effect{
    variant:EffectVariant,
    arguments: number[]
}

export interface Track{
    rhythm:Rhythm,
    sample:Sample,
    effects?:Effect[]
}

export interface Beat{
    firestoreBeatID:string
    composerID: string,     //user ID
    title: string,
    description: string,
    theme: string[],
    tracks: Track[],
    likes: number,
    cpm: number
}

function gcd(a:number, b:number):number {
    //not very effient, however ok for b <= 32 (only used in this file) 
    if (!b) {
      return a;
    }
  
    return gcd(b, a % b);
}

export class Rhythm {
    glyphs: Set<number>

    constructor(glyphs:number[]){
        if(glyphs){
            this.glyphs = new Set(glyphs)
        } else {
            this.glyphs = new Set([])
        }
    }

    getPossibleCombinations():number[]{
        let product = Array.from(this.glyphs).reduce((pre,curr)=>pre*curr,1)

        return Array(MAX_GLYPH).fill(0).map((_,i)=>i+1)
        .filter(n => gcd(product,n)===1)
    }

    getNormalizedLoopSchedule(){

        return this.getGlyphs().map(n=>{ //for every rythm n
            return Array(n).fill(0).map((_,i)=>i*(1/n)) //schedule each hit
            }).flat()
            .filter((value, index, self)=>self.indexOf(value)===index) //unique only
    }

    getGlyphs(){
        return Array.from(this.glyphs)
    }

    addGlyph(glyph:number){
        if (!this.glyphs.has(glyph)){
            this.glyphs.add(glyph)
        }
    }

    removeGlyph(glyph:number){
        if (this.glyphs.has(glyph)){
            this.glyphs.delete(glyph)
        }
    }
}

export const theme = {
    white: "#FFFFFF",
    light: "#F1F2F2",
    medium: "#D1D3D4",
    dark: "#939598",
    black: "#000000",
}

export const defaultSample: Sample = { //TODO: give only default firebase id instead
    name: "default sample",
    url: "https://tonejs.github.io/audio/drum-samples/Techno/hihat.mp3", //TODO
    firestoreSampleID: "" //TODO
}

export function playTracks(tracks:Track[], cpm:number, audioModel:AudioModel){
    audioModel.play(
        tracks.map(({sample, rhythm})=>({sampleURL:sample.url, rhythm})), 60/cpm)
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