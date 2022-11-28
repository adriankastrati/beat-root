export interface Post {
    title: string
    composer: Composer
    interactions: Interaction
    date: string
}

export interface Composer {
    username: string
    user_avatar?: string
}

export interface Interaction {
    likes: number
    midi_link: string
}
