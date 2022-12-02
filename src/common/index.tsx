import {Auth} from "firebase/auth"
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
        .filter(n => gcd(product,n))
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
