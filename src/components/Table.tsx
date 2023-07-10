import React, { useEffect } from "react";

import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from '@tanstack/react-table'

//

// //   import { fetchData, Person } from './fetchData'


export function Table(data: { data: any, isFetching: any, pageCount: any, columnDef: ColumnDef<any>[], pageState: any, onSorting:any,/* sortingState:any */} ) {
  const rerender = React.useReducer(() => ({}), {})[1]


  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })
    const [sorting, setSorting] = React.useState<SortingState>([])


  // const fetchDataOptions = {
  //   pageIndex,
  //   pageSize,
  // }

  // const dataQuery = useQuery(
  //   ['data', fetchDataOptions],
  //   () => fetchData(fetchDataOptions),
  //   { keepPreviousData: true }
  // )

  const defaultData = React.useMemo(() => [], [])

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  useEffect(() => {
    const {pageState} = data
    pageState({ pageIndex, pageSize })
  },[pageIndex, pageSize])


  
  useEffect(() => {
    const { onSorting } = data;
    let sort: any = null
    if (sorting?.[0]?.id) {
        sort = {
            id: sorting?.[0]?.id,
            desc: sorting?.[0]?.desc
        }
    }
    onSorting(sort)
  } , [data, sorting])


  const table = useReactTable({
    data: data.data ?? defaultData,
    columns: data.columnDef,
    pageCount: data.pageCount ?? -1,
    state: {
      pagination,
      sorting: sorting,
    },
    onSortingChange:setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
  })

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1 btn"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1 btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1 btn"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1 btn"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select className="form-control"
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {data.isFetching ? 'Loading...' : null}
      </div>
      {/* <div>{table.getRowModel().rows.length} Rows</div> */}

    </div>
  )
}

