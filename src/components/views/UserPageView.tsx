import { Beat } from "../../common"

interface UserPageProps{
    username: string|null
    email: string|null
    id: string|null
    description: string|null
    profilePicture?: string|null
    onUpdateUserName: (username: string)=> void
}

export default function UserPageView(props: UserPageProps){
    return <div>
        <br></br>
        <br></br>
        <br></br>
        <div>{props.username}</div>
        <div>{}</div>
        <div>{props.description}</div>
        <div>{props.email}</div>
        <div>{props.profilePicture?props.profilePicture:"no pic"}</div>
        <div>{props.id}</div>
    </div>
}