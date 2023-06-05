import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getUserList
} from '../../modules/auth';

import { GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { CustomTable } from '../../components/customTable';



let RenderuserList = ({ userList }: any) => {
  let list = userList.map((list: any, i: any) => {
    return (

      <tr key={i}>
        <td>{list.user_id}</td>
        <td>{list.full_name}</td>
        <td>{list.email}</td>
        <td>{list.phone_number}</td>
      </tr>

    )
  })

  return list
}

function Users(props: any) {
  let navigateTo = useNavigate();
  console.log(props);





  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];



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


  const filterChange = (data:any) =>{
    console.log(data);
    
  }

  useEffect(() => {
    props.getUserList()
  }, [])

  return <div>
    <h1>Users</h1>

{JSON.stringify({querySortOptions, queryOptions})}

    <div style={{ height: 400, width: '100%' }}>
      <CustomTable data={props.userList}
        columns={columns}
        pageSizeOptions={[5,10,50]}
        checkboxSelection={false}
        loading={false}
        filterMode="server"
        sortingMode="server"

        disableColumnFilter ={true}
        disableDensitySelector={true}
        disableColumnSelector={true}
        rowCount={1000}
        handleCallBack={filterChange}
      />
      {/* <DataGrid
        rows={props.userList}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection
        loading={false}
        slots={{ toolbar: GridToolbar }}
        filterMode="server"
        sortingMode="server"
        onFilterModelChange={onFilterChange}
        onSortModelChange={handleSortModelChange}
        disableColumnFilter 
        disableDensitySelector
        disableColumnSelector
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        
        rowCount={1000}
      /> */}
      {/* rowsPerPageOptions={[5]} */}
    </div>
  </div>
}

const mapStateToProps = ({ counter, auth }: any) => (
  {
    userList: auth.userList
  }
)

const mapDispatchToProps = (dispatch: any) =>

  bindActionCreators(
    {
      getUserList,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
