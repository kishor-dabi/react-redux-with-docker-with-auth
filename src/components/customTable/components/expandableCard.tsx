import { StarBorder } from "@mui/icons-material"
import { Collapse, List, ListItemButton, ListItemIcon } from "@mui/material"
import { HeaderGroup, Row, flexRender } from "@tanstack/react-table"

interface ExpandableProps {
    row: Row<any>
    viewOptions: any
    getHeaderGroups: HeaderGroup<any>[]
}
export const Expandable: React.FC<ExpandableProps> = ({ row, viewOptions, getHeaderGroups }) => {
    let rowVals = row._getAllCellsByColumnId()
    return (
        <div className="mb-2 rounded-md border items-start bg-white dark:bg-slate-700 text-black dark:text-white dark:border-slate-600">
            
            <Collapse  timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <table className="w-full">
                        {
                            getHeaderGroups.map((group, index) => (
                                <div className="w-full" key={index}>
                                    {group.headers.map((header, index2) => {
                                        return header.id !== 'select' &&
                                            <tr className=" border-b dark:border-slate-500 border-slate-300 w-full" key={index2}>
                                                <td className="  p-3 align-top w-1/2 font-semibold">
                                                        {flexRender(header.column.columnDef.header, header.getContext())} :
                                                    {/* <div className="flex border box-border items-center border-slate-400 p-2" key={header.id}>
                                                    </div> */}
                                                </td>

                                                <td className="  p-3 align-top  w-1/2">
                                                    {flexRender(rowVals[header.id].column.columnDef.cell, rowVals[header.id].getContext())}
                                                    {/* <div className='flex items-center border-slate-400 p-2 box-border'>
                                                    </div> */}
                                                </td>
                                            </tr>
                                    }
                                    )}
                                </div>
                            ))
                        }
                    </table>

                    
                
                </ListItemButton>
                </List>
            </Collapse>
            
       
        </div>
    )
}