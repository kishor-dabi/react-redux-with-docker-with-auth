import { AxiosResponse } from "axios"
import { createContext, useContext } from "react"
// import Cookies from 'universal-cookie'

interface AuthContextInterface {
    user: UserSession | null
    updateUserSession: (sessionData: UserSession) => void
    logout: Function
    login: (credentials: any,  onSuccess?: (responseData?: any)=>void, onError?: (errorResponse?: AxiosResponse)=>void) => void
    isAllowedRouteKey: (key?: string) => boolean
    setDarkTheme: (enabled: boolean) => void
    darkTheme: boolean
}

interface UserSession {
    accessToken: string
    refreshToken: string
    permissions?: any
    username?: string
    role?: string
}

const AuthContext = createContext<AuthContextInterface | null>(null)

// export const AuthProvider: React.FC<any> = async ({ children }) => {
//     // const [user, setUser] = useState<any>(null)
//     // const [darkTheme, changeDarkTheme] = useState<boolean>(!!localStorage?.getItem('darktheme'))
//     // const navigate = useNavigate()

//     // const login = (loginCredentials: any, onSuccess?: (responseData?: any)=>void, onError?: (errorResponse?: AxiosResponse)=>void) => {
//     //     const method = 'POST'
//     //     return HttpBaseRequest({
//     //         url: "/auth/login",
//     //         method: method,
//     //         data: loginCredentials
//     //     }).then((response)=>{
//     //         if(response?.data){
//     //             updateUserSession(response.data);
//     //             onSuccess && onSuccess(response.data) 
//     //         }
//     //     }).catch(error=>{
//     //         onError && onError(error)
//     //     })
//     // }

//     // const updateUserSession = (sessionData: UserSession) => {
//     //     let user_data = {
//     //         ...sessionData,
//     //         permissions: {
//     //             home: {
//     //                 dashboard: true
//     //             },
//     //             medias: {
//     //                 movie: {
//     //                     operations: 'RIE'
//     //                 },
//     //                 series: {
//     //                     operations: 'CRUDIE'
//     //                 },
//     //                 audio: {
//     //                     operations: 'RIE'
//     //                 },
//     //                 ebook: {
//     //                     operations: 'RIE'
//     //                 },
//     //                 game: {
//     //                     operations: 'CRIE'
//     //                 },
//     //                 virtual_assets: {
//     //                     operations: 'CRIE'
//     //                 }
//     //             },
//     //             deck: {
//     //                 mobile: {
//     //                     opeartions: 'CRUD'
//     //                 },
//     //                 web: {
//     //                     opeartions: 'CRUD'
//     //                 },
//     //                 tv: {
//     //                     opeartions: 'CRUD'
//     //                 },
//     //             },
//     //             trays: {

//     //             },
//     //             manage: {

//     //             },
//     //             configs: {

//     //             },
//     //             admin: {

//     //             },
//     //             settings: {

//     //             },
//     //             users: {

//     //             }
//     //         }
//     //     }
//     //     // cookies.set('_cuser', user_data, { path: '/' })
//     //     // setUser(user_data)
//     // }

//     // const logout = useCallback((redirectPath?: string) => {
//     //     // cookies.remove('_cuser', {
//     //     //     path: '/'
//     //     // })
//     //     navigate(`/login${redirectPath ? `?redirectTo=${redirectPath}` : ''}`, { replace: true })
//     //     // setUser(null)
//     // },[navigate])

//     // const isAllowedRouteKey = (key?: string) => {
//     //     return !!key && getKey(key, user?.permissions)
//     // }

//     // const setDarkTheme = (enabled?: boolean) => {
//     //     changeDarkTheme(enabled ?? false)
//     //     enabled ? localStorage.setItem('darktheme', 'true') : localStorage.removeItem('darktheme')
//     // }


// // let idata = await new Promise<any>((resolve, reject) => {
// //     setTimeout(() => {
// //         resolve(3)
// //     }, 5000);
// // })


//     // useEffect(() => {

//     //     console.log({children});
        
//     //     /** Axios interceptor logic -------------------------------------------
//     //      * isRefreshing: maintained flag to indicate refresh token API is called
//     //      * requestI: Request interceptor
//     //      * responseI: Response interceptor
//     //      * pendingRequests: stack holding all pending request which were failed and yet to called again after token refresh
//     //      * HttpBaseRequest: Request without any interceptors
//     //     */

//     //     let isRefreshing = false;
//     //     let pendingRequests: any[] = []
//     //     const requestI = axios.interceptors.request.use((config) => {
//     //         let updated = { ...config }
//     //         // updated['headers'] && user?.accessToken && (updated['headers']['authorization'] = `Bearer ${user?.accessToken}`)
//     //         return config
//     //     })
//     //     const responseI = axios.interceptors.response.use((response) => response, async (error: any) => {
//     //         return new Promise((resolve, reject) => {
//     //             const original: AxiosRequestConfig = error.config;
//     //             if (error && error?.response?.data?.statusCode === 401 && original.url !== "/auth/login") {
//     //                 if (!isRefreshing) {
//     //                     isRefreshing = true
//     //                     HttpBaseRequest({
//     //                         url: "/auth/refrest-token",
//     //                         method: 'POST',
//     //                         headers: {
//     //                             Authorization: `Bearer $ {user?.refreshToken}`
//     //                         }
//     //                     }).then((response) => {
//     //                         let accessToken = response.data?.accessToken;
//     //                         let refreshToken = response.data?.refreshToken;
//     //                         // updateUserSession({
//     //                         //     ...user,
//     //                         //     accessToken,
//     //                         //     refreshToken,
//     //                         // })
//     //                         return resolve(Promise.all(pendingRequests.map(cb => cb(accessToken))))
//     //                     }).catch(errResponse => {
//     //                         Promise.all(pendingRequests.map(cb => cb(null)))
//     //                         // logout();
//     //                         return reject(errResponse)
//     //                     }).finally(() => {
//     //                         pendingRequests = []
//     //                         isRefreshing = false
//     //                     })
//     //                 }
//     //                 return resolve(new Promise((resolve) => {
//     //                     pendingRequests.push((token: string) => {
//     //                         resolve(HttpBaseRequest({
//     //                             ...original,
//     //                             headers: {
//     //                                 Authorization: `Bearer ${token}`
//     //                             }
//     //                         }))
//     //                     })
//     //                 }))
//     //             }
//     //             else {
//     //                 return reject(error)
//     //             }
//     //         })
//     //     })

//     //     return () => {
//     //         axios.interceptors.response.eject(responseI)
//     //         axios.interceptors.request.eject(requestI)
//     //     }
//     // }, [])
//     const initialContext: any =  {}//{ user, updateUserSession, logout, isAllowedRouteKey, setDarkTheme, darkTheme, login }
//     return (
//         <AuthContext.Provider value={initialContext}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

export const useAuth = () => {
    return useContext(AuthContext)
}