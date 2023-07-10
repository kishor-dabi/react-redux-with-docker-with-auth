import { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getUserList
} from '../../modules/auth'
import {
  decrement,
  decrementAsync, increment,
  incrementAsync
} from '../../modules/counter'

// import history from "./../../utility/history";
import { Link, useNavigate } from 'react-router-dom'
import { Table } from '../../components/Table'
import { ColumnDef } from '@tanstack/react-table'

function changePage(props: any) {
  // const navigate = useNavigate();
  // navigate("about-us", { replace: true });
  console.log(props);
  return <Link to="about-us" />

};

let RenderuserList = ({ userList }: any) => {
  console.log(userList, "______________________");
  let list = userList?.results?.map((list: any, i: any) => {
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

function Home(props: any) {
  let navigate = useNavigate();
  console.log(props);
  
  async function changePage(event: any) {
    // event.history.push("about-us")
    navigate("/about-us", { replace: true });
  }
  useEffect(() => {
    console.log(props, "+++++++++++++++++++++++++++++++ calling user list API");
    props.getUserList()

  }, [])
  const columns: ColumnDef<any>[] = [
        
    {
        id: 'user_id',
        header: 'ID',
        accessorKey: 'id',
        // cell: ({ row }) => RenderImageWizard({ row, accessorKey: 'name', className: "" }),
        enableSorting: false
    },
    {
        accessorKey: 'name',
        header: () => 'Name',
        footer: (info:any) => info.column.id,
    },
    {
        accessorKey: 'email',
        footer: (info:any) => info.column.id,
        header: () => "Email"
    },
    
    {
        accessorKey: 'phone_number',
        footer: (info:any) => info.column.id,
        header: () => "Phone"
    },
    
    {
        id: 'actions',
        header: 'ACTIONS',
        cell: ({ row }) => {
            <>
                edit <br />
                delete
            </>
        },
    },

]

const changePageIndex = (data:any) =>{
  console.log(data)
}

const setSorting = (e:any) =>{
  console.log(e);
  
}


  return <div>
    <h1>Home</h1>



    <Table
    data={ props.userList/* {data: data, pageCount: 10, isFetching: false} */ }
    pageCount={1}
    isFetching={false}
    columnDef={columns}
    pageState={changePageIndex}
    onSorting={setSorting}

/>

    {/* <p>Count: {props.count}</p>

    <p>
      <button onClick={props.increment}>Increment</button>
      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
        Increment Async
      </button>
    </p>

    <p>
      <button onClick={props.decrement}>Decrement</button>
      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>
        Decrement Async
      </button>
    </p>

    <p>
      <button onClick={() => changePage(props)}>
        Go to about page via redux
      </button>
    </p> */}


    {/* <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>email</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
      
        <RenderuserList {...props} />
      </tbody>
    </table> */}
  </div>
}

const mapStateToProps = ({ counter, auth }: any) => (
  // console.log(counter, auth)
  {
    count: counter.count,
    isIncrementing: counter.isIncrementing,
    isDecrementing: counter.isDecrementing,
    userList: auth.userList
  }
)

const mapDispatchToProps = (dispatch: any) =>

  bindActionCreators(
    {
      getUserList,
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: (props) => props.history.push("/about-us")
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
