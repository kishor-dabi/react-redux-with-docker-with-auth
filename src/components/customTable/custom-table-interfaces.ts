import { ColumnDef, RowSelectionState } from "@tanstack/react-table"
import { Dispatch, SetStateAction, SVGProps } from "react"
import { UseFormReturn, FieldValues } from 'react-hook-form'
export interface TableInitialFilters {
    sorting?: {
      id?: string
      desc: boolean
    }
    globalFilter: string
  }
  export interface TableDropMenuOptions {
    text: string,
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
    onClick: () => void
  }
  export interface TableFormatProp {
    columns: ColumnDef<any>[],
    data: any[],
    rowSelectionState: [RowSelectionState, Dispatch<SetStateAction<RowSelectionState>>]
    pages?: number
    isLoading?: boolean
    isErrored?: boolean
    formHook: UseFormReturn<FieldValues, any>
    title?: any
    onAddAction?: () => void
    addButtonText?: string
    additionalOptions?: TableDropMenuOptions[]
    totalRecords?: number
    onRefresh?: () => void
    titleLabel?: string
    mobileViewOptions?: any
    filterOptions?: FilterOptions[]
    useFieldForSelect?: string
    additionalMessage?: any
    enableBackButton?: boolean
  }

  export interface FilterOptions {
    key: string
    label: string
    options: {
      display: string,
      value: any
    }[]
  }