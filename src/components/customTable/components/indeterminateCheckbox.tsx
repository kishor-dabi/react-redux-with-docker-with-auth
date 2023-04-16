import React from "react"

export function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
  }: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)
  
    React.useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }, [ref, indeterminate, rest.checked])
  
    return (
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          ref={ref}
          className={className + ' cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:checked:bg-blue-600'}
          {...rest}
        />
      </div>
    )
}