import "./text-editor.css"
import MDEditor from "@uiw/react-md-editor"
import { useEffect, useRef, useState } from "react"
import { Cell } from "../state"
import { useActions } from "../hooks/use-actions"
interface TextEditorProps {
    cell: Cell
}
const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const Ref = useRef<HTMLDivElement | null>(null)
    const [editing, setEditing] = useState(false)
    const { updateCell } = useActions()
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (event.target && Ref.current && Ref.current.contains(event.target as Node)) {
                console.log("inside editior")
                return
            }
            console.log(event.target, "outside editoe")
            setEditing(false)
        }
        document.addEventListener("click", listener, { capture: true })
        return () => {
            document.removeEventListener("click", listener, { capture: true })
        }

    }, [])

    if (editing) {
        return (<div className="text-editor card" ref={Ref}><div className="card-content"><MDEditor value={cell.content || "Click to edit"} onChange={v => updateCell(cell.id, v || "")} /></div></div>)
    }
    return (<div className="text-editor card" onClick={() => setEditing(true)}>
        <div className="card-content">
            <MDEditor.Markdown source={cell.content || "Click to edit"} /></div></div>)
}
export default TextEditor
