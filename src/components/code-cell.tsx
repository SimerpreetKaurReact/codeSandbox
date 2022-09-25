import { useEffect, useRef, useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundler from "../bundler";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
interface CodeCellProps {
    cell: Cell
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const [input, setInput] = useState("")
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const { updateCell } = useActions()
    useEffect(() => {
        let timer: any
        timer = setTimeout(async () => {
            const output = await bundler(cell.content)
            // ref.current.srcDoc = html

            // const result = await ref.current.transform(input, { loader: "jsx", target: "es2015" })

            setCode(output.code)
            setError(output.err)
        }, 1000);

        return () => {
            clearTimeout(timer)
        }
    }, [cell.content])


    // const html = `<script>${code}</script>`

    return (
        <Resizable direction="vertical">
            <div style={{ height: "calc(100%-10px)", display: "flex", flexDirection: 'row' }}>

                <Resizable direction="horizontal">

                    <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
                    {/* < textarea value={input} onChange={e => setInput(e.target.value)}></textarea> */}

                </Resizable>
                <Preview code={code} err={error} />
            </div >
        </Resizable>
    );
}

export default CodeCell;
