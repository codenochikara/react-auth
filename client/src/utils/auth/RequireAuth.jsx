import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  /* const navigate = useNavigate();
  navigate('/auth', { state: { from: location }, replace: true }) // Needs to be called in a useEffect hook; also can't be called using inline allow function () => {} */

  return (
    // auth?.username ? <Outlet /> : <Navigate to='/auth' state={{ from: location }} replace />
    auth?.roles?.find(role => allowedRoles?.includes(role)) ? (
      <Outlet />
    ) : auth?.username ? (
      <Navigate to='/unauthorized' state={{ from: location }} replace />
    ) : (
      <Navigate to='/auth' state={{ from: location }} replace />
    )
  )

  // Approach with early returns and improved readability
  /* // Not logged in
  if (!auth?.username) {
    return <Navigate to='/auth' state={{ from: location }} replace />;
  }

  // No roles or not authorized
  const hasRole = Array.isArray(auth.roles) && Array.isArray(allowedRoles)
    ? auth.roles.some(role => allowedRoles.includes(role))
    : false;

  if (!hasRole) {
    return <Navigate to='/unauthorized' state={{ from: location }} replace />;
  }

  // Authorized
  return <Outlet />; */
}

export default RequireAuth;
