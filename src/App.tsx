

import React, { Fragment, Suspense, useEffect } from 'react';


import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './containers/login';

import axios, { AxiosRequestConfig } from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FallbackLoader } from './components/fallbackLoader';
import { ProtectedContainer } from './containers/protectedContainer';
import { AuthUser, Logout, checkAuth, refreshTokenUserData } from './modules/auth';
import { HttpBaseRequest } from './services/_http';
// import history from "./../../utility/history";
const ProtectedRoute = React.lazy(() => import('./containers/index'))


// provider code ------------------------------------------------------
const MyContext = React.createContext({defaultValue:1});

const AuthProvider = (props:any) => {
  console.log(props)
  // const [user, setUser] = useState<UserSession | null>(cookies.get('_cuser') ?? null)
  // const [darkTheme, changeDarkTheme] = useState<boolean>(!!localStorage?.getItem('darktheme'))
  // const navigate = useNavigate()

  // const login = (loginCredentials: LoginApiPayload, onSuccess?: (responseData?: any)=>void, onError?: (errorResponse?: AxiosResponse)=>void) => {
  //     const method = 'POST'
  //     return HttpBaseRequest({
  //         url: APIEndpoints.Auth.Login,
  //         method: method,
  //         data: loginCredentials
  //     }).then((response)=>{
  //         if(response?.data){
  //             updateUserSession(response.data);
  //             onSuccess && onSuccess(response.data) 
  //         }
  //     }).catch(error=>{
  //         onError && onError(error)
  //     })
  // }

  // const updateUserSession = (sessionData: UserSession) => {
  //     let user_data = {
  //         ...sessionData,
  //         permissions: {
  //             home: {
  //                 dashboard: true
  //             },
  //             medias: {
  //                 movie: {
  //                     operations: 'RIE'
  //                 },
  //                 series: {
  //                     operations: 'CRUDIE'
  //                 },
  //                 audio: {
  //                     operations: 'RIE'
  //                 },
  //                 ebook: {
  //                     operations: 'RIE'
  //                 },
  //                 game: {
  //                     operations: 'CRIE'
  //                 },
  //                 virtual_assets: {
  //                     operations: 'CRIE'
  //                 }
  //             },
  //             deck: {
  //                 mobile: {
  //                     opeartions: 'CRUD'
  //                 },
  //                 web: {
  //                     opeartions: 'CRUD'
  //                 },
  //                 tv: {
  //                     opeartions: 'CRUD'
  //                 },
  //             },
  //             trays: {

  //             },
  //             manage: {

  //             },
  //             configs: {

  //             },
  //             admin: {

  //             },
  //             settings: {

  //             },
  //             users: {

  //             }
  //         }
  //     }
  //     setUser(user_data)
  // }

  // const logout = useCallback((redirectPath?: string) => {
  //     cookies.remove('_cuser', {
  //         path: '/'
  //     })
  //     navigate(`/login${redirectPath ? `?redirectTo=${redirectPath}` : ''}`, { replace: true })
  //     setUser(null)
  // },[navigate])

  // const isAllowedRouteKey = (key?: string) => {
  //     return !!key && getKey(key, user?.permissions)
  // }

  // const setDarkTheme = (enabled?: boolean) => {
  //     changeDarkTheme(enabled ?? false)
  //     enabled ? localStorage.setItem('darktheme', 'true') : localStorage.removeItem('darktheme')
  // }



  // useEffect(() => {

  //     /** Axios interceptor logic -------------------------------------------
  //      * isRefreshing: maintained flag to indicate refresh token API is called
  //      * requestI: Request interceptor
  //      * responseI: Response interceptor
  //      * pendingRequests: stack holding all pending request which were failed and yet to called again after token refresh
  //      * HttpBaseRequest: Request without any interceptors
  //     */

  //     // let isRefreshing = false;
  //     // let pendingRequests: any[] = []
  //     // const requestI = axios.interceptors.request.use((config) => {
  //     //     let updated = { ...config }
  //     //     updated['headers'] && user?.accessToken && (updated['headers']['authorization'] = `Bearer ${user?.accessToken}`)
  //     //     return config
  //     // })
  //     // const responseI = axios.interceptors.response.use((response) => response, async (error: any) => {
  //     //     return new Promise((resolve, reject) => {
  //     //         const original: AxiosRequestConfig = error.config;
  //     //         if (error && error?.response?.data?.statusCode === 401 && original.url !== APIEndpoints.Auth.Login) {
  //     //             if (!isRefreshing) {
  //     //                 isRefreshing = true
  //     //                 HttpBaseRequest({
  //     //                     url: APIEndpoints.Auth.Refresh,
  //     //                     method: 'POST',
  //     //                     headers: {
  //     //                         Authorization: `Bearer ${user?.refreshToken}`
  //     //                     }
  //     //                 }).then((response) => {
  //     //                     let accessToken = response.data?.accessToken;
  //     //                     let refreshToken = response.data?.refreshToken;
  //     //                     updateUserSession({
  //     //                         ...user,
  //     //                         accessToken,
  //     //                         refreshToken,
  //     //                     })
  //     //                     return resolve(Promise.all(pendingRequests.map(cb => cb(accessToken))))
  //     //                 }).catch(errResponse => {
  //     //                     Promise.all(pendingRequests.map(cb => cb(null)))
  //     //                     logout();
  //     //                     return reject(errResponse)
  //     //                 }).finally(() => {
  //     //                     pendingRequests = []
  //     //                     isRefreshing = false
  //     //                 })
  //     //             }
  //     //             return resolve(new Promise((resolve) => {
  //     //                 pendingRequests.push((token: string) => {
  //     //                     resolve(HttpBaseRequest({
  //     //                         ...original,
  //     //                         headers: {
  //     //                             Authorization: `Bearer ${token}`
  //     //                         }
  //     //                     }))
  //     //                 })
  //     //             }))
  //     //         }
  //     //         else {
  //     //             return reject(error)
  //     //         }
  //     //     })
  //     // })

  //     // return () => {
  //     //     axios.interceptors.response.eject(responseI)
  //     //     axios.interceptors.request.eject(requestI)
  //     // }
  // }, [/* user, logout */])
  const initialContext: any = {test:1} //{ user, updateUserSession, logout, isAllowedRouteKey, setDarkTheme, darkTheme, login }
  return (
      <MyContext.Provider value={initialContext}>
          {/* {children} */}
      </MyContext.Provider>
  )
}


// const useAuthProvider = () => {
//   return useContext(MyContext)
// }



// provider code ------------------------------------------------------

function App(props: any) {


  useEffect(() => {
    console.log("********************************* user auth ", props.isAuthenticated)


  }, [props.isAuthenticated])


  useEffect(() => {
    // console.log("__________________________________________________________________app hook", props);

    /** Axios interceptor logic -------------------------------------------
     * isRefreshing: maintained flag to indicate refresh token API is called
     * requestI: Request interceptor
     * responseI: Response interceptor
     * pendingRequests: stack holding all pending request which were failed and yet to called again after token refresh
     * HttpBaseRequest: Request without any interceptors
    */

    let isRefreshing = false;
    let pendingRequests: any[] = []
    console.log("------------------------------------intercepted", props.authUserData);

    const requestI = axios.interceptors.request.use((config) => {

      let updated = { ...config }
      if (updated['headers'] && props.authUserData?.accessToken) (updated['headers']['authorization'] = `Bearer ${props.authUserData?.accessToken}`)

      return config
    })
    const responseI = axios.interceptors.response.use((response) => response, async (error: any) => {
      return new Promise((resolve, reject) => {
        const original: AxiosRequestConfig = error.config;
        if (error && error?.response?.data?.statusCode === 401 && original.url !== "/auth/login" /* APIEndpoints.Auth.Login */) {
          if (!isRefreshing) {
            isRefreshing = true
            HttpBaseRequest({
              url: "/auth/refresh",//APIEndpoints.Auth.Refresh,
              method: 'POST',
              headers: {
                Authorization: `Bearer ${props.authUserData?.refreshToken}`
              }
            }).then((response) => {
              let accessToken = response.data?.accessToken;
              props.refreshTokenUserData(response.data)
              // updateUserSession({
              //     ...user,
              //     accessToken,
              //     refreshToken,
              // })
              return resolve(Promise.all(pendingRequests.map(cb => cb(accessToken))))
            }).catch(errResponse => {
              Promise.all(pendingRequests.map(cb => cb(null)))
              Logout();
              return reject(errResponse)
            }).finally(() => {
              pendingRequests = []
              isRefreshing = false
            })
          }
          return resolve(new Promise((resolve) => {
            pendingRequests.push((token: string) => {
              resolve(HttpBaseRequest({
                ...original,
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }))
            })
          }))
        }
        else {
          return reject(error)
        }
      })
    })


    return () => {
      axios.interceptors.response.eject(responseI)
      axios.interceptors.request.eject(requestI)
    }

  }, [props.authUserData])

  // // {props.message}

  useEffect(() => {

    props.checkAuth()

  }, [])

  return (<>
    <div>
      {/* {props.isAuthenticating ? "true" : "false"} - {props.isAuthenticated ? <button onClick={props.Logout}>logout</button> : <button onClick={props.AuthUser}>AUTH</button>} */}
      <Router /* history={props.history} */>
      
        <main>
          <Fragment>
            <Routes /* history={props.history} */>
              {
                props.isAuthenticating && !props.isAuthenticated ?
                  "loading ..." : 
                  ""
                  }

                  <>
                    <Route exact {...props} path="/" element={<Login {...props} history={props.history} />} />
                    <Route exact {...props} path="/login" element={<Login {...props} history={props.history} />} />
                    <Route path='/*' element={
                      <Suspense fallback={<FallbackLoader />}>
                        <ProtectedRoute user={{ "userData": props.authUserData, "isAuthenticated": props.isAuthenticated }} >
                          <ProtectedContainer {...props} />
                        </ProtectedRoute>
                      </Suspense>
                    }>


                      {/* <Route exact path='/about-us' {...props} element={<About  />} />
                      <Route exact {...props} path="/home" onEnter={requireAuth(props)} element={<Home  />} />
                    */}
                    </Route>
                  </>
              {/* } */}

              {/*
    <PrivateRoute exact {...props} path="/about-us" component={About} element={<About history={props.history}/>} />

     <Route exact {...props} path="" component={Home} />
    <Route exact {...props} path="/about-us" component={About} />*/}

            </Routes>
          </Fragment>
        </main>
      </Router>
    </div>
  </>)
}


const mapStateToProps = ({ auth }: any) => (
  // console.log(counter)
  {
    isAuthenticated: auth.isAuthenticated,
    isAuthenticating: auth.isAuthenticating,
    message: auth.message,
    authUserData: auth.authUserData

  }
)


const mapDispatchToProps = (dispatch: any) =>

  bindActionCreators(
    {
      checkAuth, AuthUser, Logout, refreshTokenUserData,
      changePage: (props) => props.history.push("/about-us")
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
