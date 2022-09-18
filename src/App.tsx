import *  as esbuild from "esbuild-wasm"
import { useEffect, useRef, useState } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"

function App() {
  const ref = useRef<any>()
  const [input, setInput] = useState("")
  const [code, setCode] = useState("")
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm"
    })

  }
  useEffect(() => {
    startService()

  }, [])
  const onClick = async () => {

    if (!ref.current) { return }
    console.log(ref.current)

    // const result = await ref.current.transform(input, { loader: "jsx", target: "es2015" })
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false, plugins: [unpkgPathPlugin()]
    })
    console.log(result)
    setCode(result.outputFiles[0].text)
  }
  return (
    <div className="App">
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div><button onClick={onClick}>Submit</button></div>
      <pre>{code}</pre>
    </div >
  );
}

export default App;