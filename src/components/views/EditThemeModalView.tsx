import { Track } from "../../common";

interface EditThemeModalViewProps{
    theme:string[],
    onUpdate: (theme:string[])=>void,
    onExit: ()=>void
}
export default function EditThemeModalView(props: EditThemeModalViewProps){
    return <div>Edit theme modal</div>
}