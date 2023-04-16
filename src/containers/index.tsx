import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/authContext'
function ProtectedRoute({children, user}:{ children: JSX.Element, user:any }) {
    // const auth   = useAuth()
    let location = useLocation()
    let redirectTo = location.pathname + location.search
    console.log(children.props?.isAuthenticated, children, user);
    
    if(children.props?.isAuthenticated) {
        return children
    }
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />
}

export default ProtectedRoute
