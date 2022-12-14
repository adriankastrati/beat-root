
import {Beat, Rhythm, Track} from "./index";
const colorBaseURL = `https://www.thecolorapi.com/`

async function getColorRandomScheme(colorCount: number): Promise<string[]>{
   
    let rand = (Math.ceil(Math.random()*3141592653) % 16777215).toString(16)

    let endpoint = `scheme?hex=${rand}&format=json&count=${colorCount}&mode=analogic-complement&hsl=21,50%,0%`;
    
    return fetch(colorBaseURL+endpoint).then((response)=>{
        if(response.status !== 200){
            throw Error("non 200 response to api call")
        }

        return response.json()
    }).then((colorScheme: any)=>{

        return colorScheme.colors.map((color: any)=>{
            return color.hex.value
        })
    })
}
   


async function getColorSchemeByTracks(colorCount: number, tracks: Track[]){
    let glyphSum = 0;
    
    tracks.forEach(track =>{
        glyphSum *= track.rhythm.pulses * track.rhythm.steps
    })
    
    glyphSum %= 16777215;

    let hex = glyphSum.toString(16);    
    let endpoint = `scheme?hex=${hex}&format=json&count=${colorCount}&mode=analogic-complement&hsl=21,32%,46%`;
    
    return fetch(colorBaseURL+endpoint).then(colorPromise=>{
        if(colorPromise.status !== 200){
            throw Error("non 200 response to api call")
        }
        return colorPromise.json() 
    })
}


export {getColorSchemeByTracks, getColorRandomScheme}