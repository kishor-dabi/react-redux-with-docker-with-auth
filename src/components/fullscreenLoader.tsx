import React, { useEffect } from "react"
import { Loader } from "./loader"

interface ComponentProps {
    message: string
    title: string
}
export const FullScreenLoader: React.FC<ComponentProps> = ({ message, title }) => {
    useEffect(() => {
        window.onbeforeunload = () => {
            return "Something in progress... reload might affect process."
        }
        return () => {
            window.onbeforeunload = () => { }
        }
    })
    return <div role="status" className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[#000000d6] text-white flex justify-center items-center">
        <div>
            <span className="text-lg flex items-center gap-2"><Loader /> {title}</span>
            <p className="text-sm mt-2 text-gray-300">{message}</p>
        </div>
    </div>
}