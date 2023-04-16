const twButtonBasics = 'mb-2 inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 gap-1'

export const twElementStyles = {
    twButtonPrimary: `${twButtonBasics} bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-500 text-white`,
    twButtonPrimaryOutline: `${twButtonBasics} text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-blue-300`,
    twButtonYellowOutline:`${twButtonBasics} text-yellow-400 hover:text-white border-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300`,
    twButtonBasic: `${twButtonBasics} text-gray-900 bg-white border-gray-200 hover:bg-gray-100 focus:ring-gray-200`,
    twButtonElegant: `${twButtonBasics} bg-blue-100 text-blue-900 dark:bg-slate-900 dark:text-blue-200 hover:bg-blue-200 focus-visible:ring-blue-500`,
    twButtonElegantRed: `${twButtonBasics} border-transparent bg-red-100 dark:bg-red-800 dark:text-red-100 text-red-900 hover:bg-red-200 focus-visible:ring-2 focus-visible:ring-blue-500`,
    twButtonAlternative:`${twButtonBasics} text-gray-900 bg-white dark:bg-slate-700 dark:text-slate-100 dark:border-0 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10   transition-all duration-200 flex gap-2 items-center`,
    inputLabelStyle: "block mb-1 text-xs text-gray-900 dark:text-gray-100",
    inputInvalidLabelStyle: "block mb-1 text-xs text-red-700 dark:text-red-400",
    inputInvalidFeedbackStyle: "mt-2 text-xs font-medium text-red-600 dark:text-red-400"
}