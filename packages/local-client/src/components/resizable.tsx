import React, { useEffect, useState } from "react"
import { ResizableBox, ResizableBoxProps } from "react-resizable"
import "./resizable.css"
interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resisableProps: ResizableBoxProps
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [width, setWidth] = useState(window.innerWidth * 0.75)
    useEffect(() => {
        let timer: any
        //debounce

        const listner = () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                console.log(window.innerHeight, window.innerWidth)
                setInnerHeight(window.innerHeight)
                setInnerWidth(window.innerWidth)
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75)
                }
            }, 100)

        }
        window.addEventListener('resize', listner)
        return () => {
            window.removeEventListener('resize', listner)
        }
    }, [])
    if (direction === "horizontal") {
        resisableProps = {
            className: "resize-horizontal",
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            height: Infinity, width, resizeHandles: ['e'],

            onResizeStop: (event, data) => {
                setWidth(data.size.width)
            }
        }
    } else {
        resisableProps = {
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 24],
            height: 300, width: Infinity, resizeHandles: ['s'],

        }
    }
    return <ResizableBox {...resisableProps}>{children}</ResizableBox>

}
export default Resizable