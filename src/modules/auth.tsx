// import getHeader from "../utility/axios.js";
// import axios from "axios"
import { loginApiPath, userListPath } from "../constants/constants";
import { HttpRequest } from "../services/_http";

// HttpBaseRequest.

export const AUTH_REQUESTED = 'auth/AUTH_REQUESTED'
export const IS_AUTHENTCATING = 'auth/IS_AUTHENTCATING'
export const AUTHENTCATE = 'auth/AUTHENTCATE'
export const AUTHENTCATE_ERROR = 'auth/AUTHENTCATE_ERROR'
export const LOGOUT = 'auth/LOGOUT'
export const USER_LIST = 'auth/APICALL'
export const USER_LIST_Success = 'auth/APICALL_Success'
export const REFRESH_USER_DATA = 'auth/REFRESH_USER_DATA'



const initialState = {
  isAuthenticated: false,
  isAuthenticating: true,
  message: "",
  authUserData: "",
  userList: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_REQUESTED:

      const current: any = localStorage.getItem("authUserData") ? localStorage.getItem("authUserData") : null
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: localStorage.getItem("authUserData") ? true : false,
        authUserData: localStorage.getItem("authUserData") ? JSON.parse(current) : false,
      }
    case IS_AUTHENTCATING:

      return {
        ...state,
        isAuthenticating: true,
      }

    case AUTHENTCATE:

      localStorage.setItem("authUserData", JSON.stringify(action.data))
      // const AuthData = localStorage.getItem("authUserData") ? localStorage.getItem("authUserData") : {}
      return {
        ...state,
        isAuthenticating: false,
        message: action.data.message,
        isAuthenticated: localStorage.getItem("authUserData") ? true : false,
        authUserData: localStorage.getItem("authUserData") ? action.data : false,
      }
    case REFRESH_USER_DATA:

      localStorage.setItem("authUserData", JSON.stringify(action.data))
      return {
        ...state,
        isAuthenticating: false,
        message: action.data?.message,
        isAuthenticated: localStorage.getItem("authUserData") ? true : false,
        authUserData: localStorage.getItem("authUserData") ? action.data : false,
      }
    case AUTHENTCATE_ERROR:
      localStorage.removeItem("authUserData")
      // localStorage.setItem("authUserData", JSON.stringify({ name: "kishor" }))
      return {
        ...state,
        isAuthenticating: false,
        message: action.data?.message,
        isAuthenticated: false,
        authUserData: null,
      }
    case LOGOUT:
      localStorage.removeItem("authUserData")
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: localStorage.getItem("authUserData") ? true : false,
        authUserData: localStorage.getItem("authUserData") ? JSON.parse(current) : {},

      }
    case USER_LIST_Success:
      return {
        ...state,
        userList: action.data ? action.data : []
      }

    default:
      return state
  }
}

export const checkAuth = () => {
  return (dispatch: any) => {
    dispatch({
      type: IS_AUTHENTCATING
    })

    // setTimeout(()=>{
    dispatch({
      type: AUTH_REQUESTED
    })
    // })

  }
};

export const checkAPI = () => {
  return (dispatch: any) => {
    dispatch({
      type: USER_LIST
    })
  }
};


export const refreshTokenUserData = (data: any) => {
  return (dispatch: any) => {
    dispatch({
      type: REFRESH_USER_DATA,
      data

    })
  }
};

export const checkAPISuccess = (response: any, dispatch: any) => {

  return (dispatch: any) => {
    let data = {
      type: USER_LIST_Success,
      data: response.data
    }

    dispatch(data);
    // router.transitionTo('/dashboard'); // will fire CHANGE_ROUTE in its change handler
  };
}

export const loginSuccess = (response: any, dispatch: any) => {

  return (dispatch: any) => {
    let data = {
      type: AUTHENTCATE,
      data: response.data
    }

    dispatch(data);
    // router.transitionTo('/dashboard'); // will fire CHANGE_ROUTE in its change handler
  };
}


export const getUserList = (data: any) => {

  return (dispatch: any) => {
    dispatch({
      type: USER_LIST
    })
    //     let header = getHeader()
    // console.log(data, {data:getHeader()});
    // let token = await getAuthToken()
    // axios.get('/user')
    HttpRequest({
      url: userListPath,
      method: "GET",
      data
    })
      .then(function (response: any) {

        dispatch({
          type: USER_LIST_Success,
          data: response.data
        })
      })
      .catch(function (error: any) {

      });
  }
}

export const AuthUser = (data: any) => {

  return (dispatch: any) => {
    dispatch({
      type: IS_AUTHENTCATING
    })

    HttpRequest({
      url: loginApiPath,//"/auth/login",
      method: "POST",
      data
    })
      // axios.post('http://localhost:8888/api/login', {
      //     ...data
      //   })
      .then(function (response: any) {

        dispatch({
          type: AUTHENTCATE,
          data: response.data
        })
      })
      .catch(function (error: any) {

        console.log(error);
        
        dispatch({
          type: AUTHENTCATE_ERROR,
          data: error
        })
      });
    // let self = this;
    //
    // fetch(`http://localhost:8888/api/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then((res) => res.json())
    // .then((response) => {
    //   console.log({response}, dispatch);
    //
    //     return loginSuccess(response, dispatch)
    // // return  self.dispatch(d)
    //    // d;
    //
    // })
    // .catch((error) => {
    //   console.log(error);
    //   error = {
    //         message: 'Invalid mobile number!'
    //       }
    //  throw error
    // })


  }
}



export const Logout = () => {
  return (dispatch: any) => {
    dispatch({
      type: LOGOUT
    })
  }
}


// let getAuthToken = async () => {
//   let tokenData = localStorage.getItem('authUserData');
//   let token = "";
//   if (tokenData) {

//     token = JSON.parse(tokenData).token
//   }
//   return token;
// }