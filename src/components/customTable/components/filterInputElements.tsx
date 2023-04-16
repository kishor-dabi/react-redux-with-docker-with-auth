import { List } from "@mui/material"
import React from "react"

interface FilterSelectProps {
    value?: any
    onChange: (e: any) => void
    label?: string
    options: { value: any, display: string }[]
    multiple?: boolean
}
export const FilterSelect: React.FC<FilterSelectProps> = ({
    value,
    onChange,
    label,
    options,
    multiple }) => {

    const getDisplay = (value: any) => {
        return options.find(option => option.value === value)?.display ?? label;
    }
    const getDisplayText = (value: any) => {
        return multiple ? (
            value?.length ? value.map((val: any) => getDisplay(val)).join(', ') : label
        ) : (
            getDisplay(value)
        )
    }
    return (
        
        /* as={'div'} className="relative min-w-[130px]" value={value} onChange={onChange} {...{ multiple }} */
        <List >
            {/* <Listbox.Button title={getDisplayText(value)} className={`flex items-center rounded-lg px-2.5 pb-1 pt-4 w-full text-sm text-gray-900 bg-gray-100 border dark:bg-slate-700 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}>
                <div className="w-max text-xs max-w-[200px] truncate">
                    {getDisplayText(value)}
                </div>
                <div className='box-border ml-auto'>
                    {
                        multiple ? <ChevronUpDownIcon className='h-4 w-4' /> : <ChevronDownIcon className='h-4 w-4' />
                    }
                </div>
            </Listbox.Button>
            <Listbox.Options className="absolute w-max mt-1 right-1 max-w-xl z-20 max-h-60  overflow-auto rounded-md bg-white dark:bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option, optionIndex) => (
                    <Listbox.Option
                        key={optionIndex}
                        className={({ active }) =>
                            `relative cursor-default select-none  text-xs py-2 pl-10 pr-4 ${active ? 'bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-white' : 'text-gray-900 dark:text-white'
                            }`
                        }
                        value={option.value}
                    >
                        {({ selected }) => (
                            <>
                                <span
                                    className={`block ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                >
                                    {option.display}
                                </span>
                                {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                ) : null}
                            </>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                {label}
            </label> */}

        </List>
    )
}