import { Search } from "@mui/icons-material"
import { useEffect, useState } from "react"

export function DebouncedInput({

    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue)
  
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)
  
      return () => clearTimeout(timeout)
    }, [value, debounce, onChange])
  
    return (
      <div className='relative w-full max-w-sm'>
        <input
          id="inputSearch"
          className="flex items-center rounded-lg px-2.5 pl-8 py-2.5 w-full text-gray-900 bg-gray-100 border dark:bg-slate-700 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 text-xs focus:border-blue-600 peer placeholder:dark:text-gray-300"
          placeholder={`Search ... `}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none dark:text-white">
          <Search className="h-4 w-4"/>
        </span>
      </div>
    )
  }
  