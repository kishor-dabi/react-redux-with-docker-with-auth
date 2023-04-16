import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext'
function ProtectedRoute({ children }: { children: JSX.Element }) {
    const auth   = useAuth()
    let location = useLocation()
    let redirectTo = location.pathname + location.search
    if(auth?.user?.refreshToken) {
        return children
    }
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />
}

export default ProtectedRoute
