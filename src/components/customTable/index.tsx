// import { Menu, Popover, Transition } from '@headlessui/react'
// import { AdjustmentsHorizontalIcon, ArrowDownIcon, ArrowUpIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
// import ChevronDoubleLeftIcon from '@heroicons/react/24/outline/ChevronDoubleLeftIcon'
// import ChevronDoubleRightIcon from '@heroicons/react/24/outline/ChevronDoubleRightIcon'
// import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon'
// import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'
// import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React, { useCallback, useEffect, useState } from 'react';
// import { MdRefreshIcon } from '../icons/MdRefreshIcon'
import { DataGrid, GridFilterModel, GridSortModel, GridToolbar } from '@mui/x-data-grid';
// import { TableFormatProp } from './custom-table-interfaces';

export const CustomTable: React.FC<any> = (
    {
        columns,
        data = [],
        pageSizeOptions=[5,10,50],
        checkboxSelection=false,
        loading=false,
        filterMode="server",
        sortingMode="server",

        disableColumnFilter = true,
        disableDensitySelector = true,
        disableColumnSelector = true,
        rowCount,
        handleCallBack,

        // pages,
        // rowSelectionState,
        // isLoading,
        // title,
        // onAddAction,
        // additionalOptions,
        // totalRecords,
        // isErrored,
        // // titleLabel,
        // onRefresh = () => { },
        // mobileViewOptions,
        // filterOptions,
        // useFieldForSelect = 'id',
        // // addButtonText,
        // // additionalMessage,
        // enableBackButton = false
    }:any) => {
    // const { setValue } = formHook;
   
  const [queryOptions, setQueryOptions] = React.useState({});
  const [querySortOptions, setQuerySortOptions] = useState({});

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {    
    // Here you save the data you need from the filter model
    setQueryOptions({ filterModel: { ...filterModel } });
  }, []);

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    // Here you save the data you need from the sort model
    setQuerySortOptions({ sortModel: [...sortModel] });
  }, []);

  useEffect(()=>{
    console.log("===================================", queryOptions, querySortOptions);
    handleCallBack({queryOptions, querySortOptions})
    
  },[handleCallBack, queryOptions, querySortOptions])

    return (
        <div className='w-100 h-100' >
            <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection
        loading={false}
        slots={{ toolbar: GridToolbar }}
        filterMode={filterMode}
        sortingMode={sortingMode}
        onFilterModelChange={onFilterChange}
        onSortModelChange={handleSortModelChange}
        disableColumnFilter={disableColumnFilter} 
        disableDensitySelector={disableDensitySelector}
        disableColumnSelector={disableColumnSelector}
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        
        rowCount={rowCount}
      />
        </div>
    )
}