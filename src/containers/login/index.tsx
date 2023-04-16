
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AuthUser,
  Logout, checkAuth
} from '../../modules/auth';

import { useNavigate } from "react-router-dom";
// import { Field, reduxForm } from 'redux-form';
import { Field, Form } from 'react-final-form';

import { renderField } from "../../components/ui/Input";
import { Required, composeValidators, emailFieldValidation } from '../../utility/validation';

// var renderField = ({ input, label, name, type, meta, value }: any) => {

//   return (<div>
//     {/* <label>{label}</label> */}
//     <div className='form-group'>

//       <TextField error={renderError(meta) === '' ? false : true} id="standard-error-helper-text" fullWidth={true}
//         {...input} type={type} label={label} helperText={renderError(meta)} variant="standard"
//       />
//       {/* <input  {...input} type={type} className={meta.touched && meta.error ? 'is-invalid form-control' : 'form-control'} value={value} />
//        {renderError(meta)} */}
//     </div>
//   </div>
//   )
// }


// let renderError = ({ error, touched }: any) => {

//   if (error && touched) {
//     return (<span className=""> {error} </span>)
//   }
//   return ''
// }

// let renderField = ({ input, label, name, type, meta }: any) => {

//   console.log(meta, input);
//   const error = renderError(meta) !== '' ? true : false
//   return (<div>
//     {/* <label>{label}</label> */}
//     <div className='form-group'>

//       <input variant="outlined" className={ `block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer placeholder:text-transparent focus:placeholder:text-gray-500 dark:focus:placeholder:text-gray-300 text-gray-900  disabled:opacity-70 disabled:pointer-events-none bg-gray-100 dark:bg-slate-700 ${error ? 'border-red-500 dark:text-white dark:border-red-500' : 'border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 dark:hover:border-blue-500 hover:border-blue-600'} `} error={renderError(meta) === '' ? false : true} id="standard-error-helper-text" fullWidth={true}
//         {...input} type={type} label={label} helperText={renderError(meta)}
//       />
//       {renderError(meta)}
//       <br />
//       {/* 
//       <TextField type={type} 
//           required fullWidth 
//           helperText={renderError(meta)} 
//           error={renderError(meta) !== ''}
//           id="" 
//           label={label}  variant="standard"
//           /> */}
//           {/* defaultValue="Hello World" */}
//       {/* <input  className={meta.touched && meta.error ? 'is-invalid form-control' : 'form-control'} /> */}
//       {/* {this.renderError(meta)} */}
//     </div>
//   </div>
//   )
// }


const LoginForm = (props: any) => {

  console.log('props ------------------------------------');
  console.log(props);
  console.log('props ------------------------------------');


  let navigate = useNavigate();


  useEffect(() => {
    console.log(props);
    if (props.isAuthenticated) {
      console.log("navigate from login");
      navigate("/home")
    }
  }, [props.isAuthenticated, props.authUserData, props, navigate])

  var submit = (e: any) => {
    props.AuthUser(e);
  }


  // const { handleSubmit, reset, submitting } = props

  return (
    <div className='row mt-3'>
      <Form onSubmit={submit}>
        {({ handleSubmit, pristine, form, submitting }) => (
          <form onSubmit={handleSubmit}>

            {/* <Card variant="outlined"> */}
              <div className='container col-4 mt-5 login-form' >
                <div className='mb-2 border-bottom text-center font-monospace'> <h4>Please login to continue...</h4> </div>
                <div className="mb-4">
                  <Field
                    name="email" validate={composeValidators(emailFieldValidation, Required)}
                    component={renderField} id="email"
                    label="Email"
                    type="text"
                  />
                </div>
                <div >
                  <Field
                    name="password" validate={Required}
                    component={renderField}
                    label="Password"
                    type="password"
                  />
                </div>
                <div className='mt-4 text-center '>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>

                  <button onClick={form.reset} className="btn btn-primary ms-5"> reset
                  </button>
                </div>
              </div>

            {/* </Card> */}
          </form>

        )}
      </Form>
    </div>
  )
}


const mapStateToProps = ({ auth }: any) => (
  {
    isAuthenticated: auth.isAuthenticated,
    isAuthenticating: auth.isAuthenticating,
    authUserData: auth.authUserData,
  }
)

const mapDispatchToProps = (dispatch: any) =>

  bindActionCreators(
    {
      checkAuth, AuthUser, Logout,
      changePage: (props) => props.history.push("/about-us"),
      logData: (props) => console.log(props)
    },
    dispatch
  )

let Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default Login

// export default reduxForm({
//   form: 'login', // a unique identifier for this form
//   // validate
// })(Login)

