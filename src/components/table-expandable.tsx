
import { HeaderGroup, Row, flexRender } from "@tanstack/react-table"
import { Accordion } from "react-bootstrap"

interface ExpandableProps {
  row: Row<any>
  getHeaderGroups: HeaderGroup<any>[]
}
export const Expandable: React.FC<ExpandableProps> = ({ row, getHeaderGroups }) => {
  let rowVals = row._getAllCellsByColumnId()
  return (
      <>

            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {rowVals['name'] ? <div className="p-2">
                  {flexRender(rowVals['name']?.column?.columnDef?.cell, rowVals['name']?.getContext())}
                </div> : <></>}
              
              </Accordion.Header>
              <Accordion.Body>
                <div className="px-4 pt-4 pb-2 text-sm border-l border-r border-blue-100 dark:border-slate-600 rounded-b-md">
                    {
                        getHeaderGroups.map((group, index) => (
                            <>
                          <table className="w-full sub-table" key={index}>
                          {group.headers.map((header, index2) => {
                            return (header.id !== 'select' ?
                             ( <tr  className=" border-b dark:border-slate-500 border-slate-300 w-full" key={index2}>
                                <td className="  p-3 align-top w-1/2 font-semibold">
                                  {flexRender(header.column.columnDef.header, header.getContext())} :
                                
                                </td>

                                <td className="  p-3 align-top  w-1/2">
                                  {flexRender(rowVals[header.id].column.columnDef.cell, rowVals[header.id].getContext())}
                                 
                                </td>
                              </tr>) : <></>)
                          }
                          )}
                  </table>
                        </>
                      ))
                    }
                </div>
              </Accordion.Body>
            </Accordion.Item>

      </>
  )
}