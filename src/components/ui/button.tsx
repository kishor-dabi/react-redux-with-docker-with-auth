import React from "react";
import { Loader } from "../loader";

interface ButtonProps extends React.ButtonHTMLAttributes<any> {
    color:
    'basic' |
    'blue' |
    'gray' |
    'red' |

    'blue-accent' |
    'red-accent'

    isLoading?: boolean
    loadinText?: string
}

export const coreButtonClasses = `mb-2 inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 gap-1 items-center disabled:opacity-75 disabled:pointer-events-none`

export const buttonClasses: any = {
    'basic': `${coreButtonClasses} text-gray-900 bg-white dark:bg-slate-700 dark:text-slate-100 border-gray-200 dark:border-gray-700 hover:bg-gray-100 hover:text-blue-700`,
    'blue': `${coreButtonClasses} bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-500 text-white `,
    'red': `${coreButtonClasses} bg-[#ff4e4e] dark:bg-[#8c3b3b] hover:bg-red-800 focus-visible:ring-red-500 text-white `,
    'gray': `${coreButtonClasses} bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 focus-visible:ring-gray-500 text-gray-800 dark:text-gray-200 `,
    'blue-accent': `${coreButtonClasses} bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900 focus-visible:ring-blue-500 text-blue-800 dark:text-blue-100`,
    'red-accent': `${coreButtonClasses} bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-900 focus-visible:ring-red-500 text-red-800 dark:text-red-100`,
}
export const Button: React.FC<ButtonProps> = ({ color, isLoading, loadinText, ...props }) => {
    let otherProps = { ...props }
    delete otherProps['className']
    return (
        <button disabled={isLoading} className={`${buttonClasses[color]} ${props.className}`} {...otherProps} >
            {isLoading ? (
                <><Loader /> {loadinText ?? props.children} </>
            ) : props.children}
        </button>
    )
}