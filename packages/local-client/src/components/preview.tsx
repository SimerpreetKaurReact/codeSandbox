import "./preview.css"


import { useEffect, useRef } from "react"
interface PreviewProps {
    code: string,
    err: string
}
const html = `
   <html>
    <head>
    <style>html {background-color:white;}</style></head>
    <body>
      <div id="root"></div>
      <script>
      const handleError=err=>{
        const root= document.querySelector('#root')
        root.innerHTML='<div>'+err+'</div>'
        throw err;
      }
      window.addEventListener('error',(event)=>{
          event.preventDefault()
        handleError(event.error)
      })
      window.addEventListener('message',(event)=>{
        try{
          eval(event.data)
        }catch(err){
      
            handleError(err)
     }
     },false);
      </script>
    </body>
   </html>
 `
const Preview: React.FC<PreviewProps> = ({
    code, err
}) => {
    const frameRef = useRef<any>()
    useEffect(() => {
        frameRef.current.srcdoc = html
        setTimeout(() => {
            frameRef.current.contentWindow.postMessage(code, '*')
        }, 50)


    }, [code])
    return (
        <div className="preview-wrapper"><iframe title="preview" srcDoc={html} sandbox="allow-scripts" ref={frameRef}
        />
            {err && <div className="preview-error">{err}</div>}
        </div>
    )
}
export default Preview