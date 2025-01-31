import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../axios-client";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ requiredRole, redirectPath }) {
  ProtectedRoute.propTypes = {
    requiredRole: PropTypes.string.isRequired,
    redirectPath: PropTypes.string.isRequired
  }

  const {user, setUser} = useStateContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user role if not already set
    if(!user) {
      axiosClient.get('/user')
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        })
    } else {
      setLoading(false);
    }

  }, [user, setUser])
  
  // Show loading until user data is fetched
  if(loading) {
    return null;
  }

  // Redirect if the role doesn't match
  if(user?.jabatan !== requiredRole) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />

  // return (
  //   <div>
      
  //   </div>
  // )
}
