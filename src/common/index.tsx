export interface Sample{
    firestoreSampleID: string,
    name: string,
    url: string
}

export interface Rhythm{
    glyphs: number[]
}

export interface Track{
    rhythm: Rhythm,
    sample: Sample
}

export interface Beat{
    firestoreBeatID?: string,
    composerID: string,
    title: string,
    description?: string,
    tracks?: Track[],
    theme: string[],
    likes: number,
    cpm?: number
}