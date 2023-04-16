// import { Menu, Popover, Transition } from '@headlessui/react'
// import { AdjustmentsHorizontalIcon, ArrowDownIcon, ArrowUpIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
// import ChevronDoubleLeftIcon from '@heroicons/react/24/outline/ChevronDoubleLeftIcon'
// import ChevronDoubleRightIcon from '@heroicons/react/24/outline/ChevronDoubleRightIcon'
// import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon'
// import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'
// import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { ColumnFiltersState, PaginationState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
// import { MdRefreshIcon } from '../icons/MdRefreshIcon'
import { AddOutlined, ArrowDownward, ArrowLeft, ArrowRight, ArrowUpward, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, VerticalAlignBottom } from '@mui/icons-material'
import { Button, List, ListItem, Menu } from '@mui/material'
import { Popover } from 'react-bootstrap'
import { ColumnFilter } from './components/columnFilter'
import { DebouncedInput } from './components/debouncedInput'
import { Expandable } from './components/expandableCard'
import { FilterSelect } from './components/filterInputElements'
import { TableFormatProp } from './custom-table-interfaces'

export const CustomTable: React.FC<TableFormatProp> = (
    {
        columns,
        data = [],
        pages,
        rowSelectionState,
        isLoading,
        formHook,
        title,
        onAddAction,
        additionalOptions,
        totalRecords,
        isErrored,
        titleLabel,
        onRefresh = () => { },
        mobileViewOptions,
        filterOptions,
        useFieldForSelect = 'id',
        addButtonText,
        additionalMessage,
        enableBackButton = false
    }) => {
    const { setValue } = formHook;
    const [sorting, setSorting] = useState<SortingState>(formHook.getValues('sort') ? [formHook.getValues('sort')] : []);
    const [globalFilter, setGlobalFilter] = useState<any>(formHook.getValues('search') || '')
    const [pagination, setPagination] = useState<PaginationState>(formHook.getValues('pagination') ?? {
        pageIndex: 0,
        pageSize: 10
    });
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(formHook.getValues('fields') || [])
    const [rowSelection, setRowSelection] = rowSelectionState

    useEffect(() => {
        setValue('search', globalFilter)
        setPagination((pagination:any) => {
            let pagination_new = { ...pagination, pageIndex: 0 }
            return pagination_new;
        })
    }, [globalFilter, setValue])

    useEffect(() => {
        let sort: any = null
        if (sorting?.[0]?.id) {
            sort = {
                id: sorting?.[0]?.id,
                desc: sorting?.[0]?.desc
            }
        }
        setValue('sort', sort)
    }, [sorting, setValue])

    useEffect(() => {
        if (pagination) setValue('pagination', pagination)
    }, [pagination, setValue])

    useEffect(() => {
        if (columnFilters.length) {
            setValue('fields', columnFilters)
            setPagination((pagination:any) => {
                let pagination_new = { ...pagination, pageIndex: 0 }
                return pagination_new;
            })
        }
        else {
            setValue('fields', null)
        }
    }, [columnFilters, setValue])

    const [columnVisibility, setColumnVisibility] = React.useState({})

    const table = useReactTable({
        data: data,
        columns: columns,
        pageCount: pages || 0,
        state: {
            globalFilter: globalFilter,
            sorting: sorting,
            pagination: pagination,
            rowSelection: rowSelection,
            columnVisibility: columnVisibility
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        manualFiltering: true,
        enableColumnFilters: false,
        manualPagination: true,
        manualSorting: true,
        getRowId: (row:any) => row[useFieldForSelect]
    })
    const {
        getHeaderGroups,
        getRowModel,
    } = table

    const handleColumnFilterChange = (key: string, value: any) => {
        let filter = [...columnFilters]
        const index = filter.findIndex(f => f.id === key)
        if (index >= 0) {
            if (value === '' || value === null) {
                filter.splice(index, 1)
            }
            else {
                filter[index].value = value;
            }
        }
        else {
            filter.push({
                value: value,
                id: key
            })
        }

        setColumnFilters([
            ...filter
        ])
    }

    const getFilterOptionValue = (key: string) => {
        return columnFilters.find((f:any) => f.id === key)?.value ?? ''
    }
    return (
        <div className={`w-full bg-white dark:bg-slate-800`} >
            <div className='w-full  dark:text-white flex-col items-center gap-2'>
                <div className="flex flex-col md:flex-row md:items-center gap-2 bg-inherit py-1 w-full mb-2">
                    {
                        enableBackButton &&
                        <button onClick={() => window.history.back()}>
                            <ArrowLeft className='h-4 w-4 mx-1' />
                        </button>
                    } {title && <h4 className='text-xl'>{title}</h4>}
                    <button type='button' className='hidden md:block' onClick={onRefresh}>
                        refresh
                        {/* <MdRefreshIcon className={`h-6 w-6 ${isErrored ? 'dark:text-red-500 text-red-600' : 'dark:text-blue-500 text-blue-700'} ${isLoading ? 'animate-spin' : ''}`} /> */}
                    </button>
                    <div className="md:ml-auto flex items-center gap-1">
                        <DebouncedInput
                            value={globalFilter}
                            onChange={(value) => setGlobalFilter(String(value))}
                            placeholder="Search all columns..."
                        />
                        <div className="hidden md:flex items-center">
                            {
                                filterOptions?.map((option, index) => (
                                    <div key={index} className="inline-block m-1">
                                        <FilterSelect key={index} value={getFilterOptionValue(option.key)} onChange={e => handleColumnFilterChange(option.key, e)} label={option.label} options={option.options} />
                                    </div>
                                ))
                            }
                        </div>
                        {
                            !!filterOptions?.length &&
                            <div className='block md:hidden'>
                                <Popover className="relative">
                                    {/* <Popover.Button className={'flex items-center rounded-lg px-2.5 py-2.5 w-full text-gray-900 bg-gray-100 border dark:bg-slate-700 border-gray-300 appearance-none dark:text-white dark:border-gray-600 text-xs'}>
                                        <AdjustmentsHorizontalIcon className='h-4 w-4' /> */}
                                        <span className="hidden md:inline">
                                            Filter
                                        </span>
                                    {/* </Popover.Button> */}

                                    {/* <Popover.Panel className="absolute z-30 mt-2 right-0 dark:bg-slate-800 dark:border-slate-600 bg-white shadow-lg border p-4 rounded-lg w-max flex flex-col gap-2"> */}
                                        {
                                            filterOptions?.map((option, index) => (
                                                <div key={index} className="inline-block m-1">
                                                    <FilterSelect value={getFilterOptionValue(option.key)} onChange={e => handleColumnFilterChange(option.key, e)} label={option.label} options={option.options} />
                                                </div>
                                            ))
                                        }
                                    {/* </Popover.Panel> */}
                                </Popover>
                            </div>

                        }
                        {onAddAction && <button color='blue' type='button' onClick={onAddAction} className={'inline-flex items-center rounded-full text-blue-600  gap-2 font-semibold '}><AddOutlined className='w-10 h-10' /> </button>}
                        {additionalOptions && !!additionalOptions?.length &&
                            <Menu open={false} className="relative inline-flex text-left items-center">
                                <Button >
                                    <VerticalAlignBottom
                                        className="ml-2 mr-1 h-5 w-5  hover:text-blue-800"
                                        aria-hidden="true"
                                    />
                                </Button>
                                {/* <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                > */}
                                    <List className="z-20 absolute top-0 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1 ">
                                            {
                                                additionalOptions?.map((option, index) => (
                                                    <ListItem key={`menuItem${index}`}>
                                                        {/* {({ active }) => (
                                                            <button
                                                                onClick={option.onClick}
                                                                className={`${active ? 'bg-blue-500 text-white dark:bg-slate-700 ' : 'text-gray-900 dark:text-gray-200'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                <option.Icon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                                {option.text}
                                                            </button>
                                                        )} */}
                                                    </ListItem>
                                                ))
                                            }
                                        </div>
                                    </List>
                                {/* </Transition> */}
                            </Menu>
                        }
                    </div>
                </div>
            </div>

            {
                additionalMessage && <div>{additionalMessage}</div>
            }

            <div className='overflow-auto w-full h-[calc(100vh-220px)] rounded-md'>
                <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-300 hidden md:table ">
                    <thead className='sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-800 z-10 '>
                        {getHeaderGroups().map((group:any) =>
                        (
                            <tr key={group.id} >
                                {group.headers.map((header:any) =>
                                (
                                    <th className={`font-bold dark:text-slate-100 border-t-0 ${header.column.id in { 'select': 1, 'actions': 1 } ? 'bg-slate-200 dark:bg-slate-900' : 'bg-slate-300 dark:bg-slate-700'} ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`} colSpan={header.colSpan} key={header.id}>
                                        <div className='px-2 py-2 w-full' onClick={header.column.getToggleSortingHandler()} >
                                            {flexRender(header.column.columnDef.header, header.getContext())}

                                            {{ asc: <><ArrowUpward className='inline h-4 w-3 align-sub ml-2' /></>, desc: <><ArrowDownward className='inline h-4 w-3 align-sub ml-2' /></> }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                        {header.column.getCanFilter() ? (
                                            <div className='w-full px-2 py-2 '>
                                                <ColumnFilter column={header.column} table={table} />
                                            </div>
                                        ) : null}
                                    </th>
                                )
                                )}
                            </tr>
                        )
                        )}
                    </thead>
                    <tbody>
                        {getRowModel().rows?.length ? getRowModel().rows.map((row:any, index:any) => (
                            <tr key={index} className="bg-white text-gray-700 dark:text-gray-200 dark:bg-slate-800 border-b dark:border-b-0 hover:bg-gray-100 dark:hover:bg-slate-700">
                                {row.getVisibleCells().map((cell:any) => (
                                    <td className='p-2' key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        )) : (
                            !isLoading && !isErrored ?
                                <tr>
                                    <td colSpan={50}>
                                        <div className="p-4 text-sm text-gray-700 dark:text-gray-200 dark:bg-slate-700 bg-gray-100 text-center " role="alert">
                                            <span className="font-medium">No records found !</span> Try removing filters if applied.
                                        </div>
                                    </td>
                                </tr>
                                : (
                                    isErrored ? (
                                        <tr>
                                            <td colSpan={50}>
                                                <div className="p-4 text-sm text-gray-700 dark:text-gray-200 dark:bg-slate-700 bg-gray-100 text-center" role="alert">
                                                    <span className="font-medium">Something went wrong!</span> Please Try after sometime.
                                                </div>
                                            </td>
                                        </tr>
                                    ) : <></>
                                )
                        )}

                    </tbody>
                </table>
                <div className='block md:hidden mt-4'>
                    {getRowModel().rows?.length ? getRowModel().rows.map((row:any, index:any) => (
                        <div key={index} id={index?.toString()}>
                            <Expandable getHeaderGroups={getHeaderGroups()} viewOptions={mobileViewOptions} row={row} />
                        </div>
                    )) : (
                        !isLoading && !isErrored ?
                            <tr>
                                <td colSpan={50}>
                                    <div className="p-4 text-sm text-gray-700 dark:text-gray-200 dark:bg-slate-700 bg-gray-100 text-center " role="alert">
                                        <span className="font-medium">No records found !</span> Try removing filters if applied.
                                    </div>
                                </td>
                            </tr>
                            : (
                                isErrored ? (
                                    <tr>
                                        <td colSpan={50}>
                                            <div className="p-4 text-sm text-gray-700 dark:text-gray-200 dark:bg-slate-700 bg-gray-100 text-center" role="alert">
                                                <span className="font-medium">Something went wrong!</span> Please Try after sometime.
                                            </div>
                                        </td>
                                    </tr>
                                ) : <></>
                            )
                    )}
                </div>
            </div>
            <div className=" flex items-center gap-2 w-full bg-white dark:bg-slate-800">
                {titleLabel && <p className='text-xs dark:text-gray-400 text-gray-700 hidden lg:block'>{titleLabel}</p>}
                <div className='flex flex-col md:flex-row items-center mx-auto md:mx-0 md:ml-auto'>
                    <div className="flex items-center">
                        <button
                            className={`py-2 px-2 bg-white dark:bg-slate-800 dark:text-white ${!table.getCanPreviousPage() ? 'opacity-50' : ''}`}
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {<KeyboardDoubleArrowLeft className='h-4 w-4' />}
                        </button>
                        <button
                            className={`py-2 px-2 bg-white dark:bg-slate-800 dark:text-white ${!table.getCanPreviousPage() ? 'opacity-50' : ''}`}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {<ArrowLeft className='h-4 w-4' />}
                        </button>
                        <button
                            className={`py-2 px-2 bg-white dark:bg-slate-800 dark:text-white ${!table.getCanNextPage() ? 'opacity-50' : ''}`}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {<ArrowRight className='h-4 w-4' />}
                        </button>
                        <button
                            className={`py-2 px-2 bg-white dark:bg-slate-800 dark:text-white ${!table.getCanNextPage() ? 'opacity-50' : ''}`}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            {<KeyboardDoubleArrowRight className='h-4 w-4' />}
                        </button>
                    </div>

                    <span className="flex items-center gap-1 px-4 py-2 border-0  bg-white dark:bg-slate-800 dark:text-white opacity-75">
                        <div>Page</div>
                        <p>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </p>
                    </span>
                    <select className=' border-0  bg-white dark:bg-slate-800 dark:text-white focus:ring-0 text-sm cursor-pointer  hidden md:block lg:block xl:block 2xl:block'
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    {
                        totalRecords && <span className='dark:text-gray-400 hidden md:block lg:block xl:block 2xl:block'>Total {totalRecords}</span>
                    }
                </div>
            </div>
        </div>
    )
}