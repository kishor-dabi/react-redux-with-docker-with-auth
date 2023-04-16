import { Loader } from "./loader"

export const FallbackLoader = () => {
    return (
        <div role="status" className="animate-pulse dark:text-white text-black bg-white dark:bg-slate-700 w-full flex p-4 min-h-screen justify-center items-center gap-2">
            <Loader/>
            <span>Please wait ...</span>
        </div>
    )
}