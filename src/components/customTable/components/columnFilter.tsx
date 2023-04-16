import { Column, Table } from "@tanstack/react-table"
import React from "react"
import { DebouncedInput } from "./debouncedInput"

export function ColumnFilter({
    column,
    table,
  }: {
    column: Column<any, unknown>
    table: Table<any>
  }) {
    const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id)
  
    const columnFilterValue = column.getFilterValue()
  
    const sortedUniqueValues = React.useMemo(
      () =>
        typeof firstValue === 'number'
          ? []
          : Array.from(column.getFacetedUniqueValues().keys()).sort(),
      [column.getFacetedUniqueValues()]
    )
  
    return 0 ? (
      <div>
        <div className="flex space-x-2 justify-center">
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={value =>
              column.setFilterValue((old: [number, number]) => [value, old?.[1]])
            }
            placeholder={`Min ${column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
              }`}
            className="w-24 border-0 focus:ring-slate-400"
          />
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={value =>
              column.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
              }`}
            className="w-24  border-0 focus:ring-slate-400"
          />
        </div>
        <div className="h-1" />
      </div>
    ) : (
      <>
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.slice(0, 5000).map((value: any) => (
            <option value={value} key={value} />
          ))}
        </datalist>
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? '') as string}
          onChange={value => column.setFilterValue(value)}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          className="block font-normal p-2 pl-10 text-sm text-gray-900 bg-gray-50 dark:bg-slate-900 dark:text-white dark:border-0 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full"
          list={column.id + 'list'}
        />
        <div className="h-1" />
      </>
    )
  }