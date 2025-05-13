import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";

export default function RoleBasedRedirect() {
  const { user, setUser, token } = useStateContext();
  const [ loading, setLoading ] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(!token) {
      setLoading(false);
      return;
    }

    if(!user) {
      axiosClient.get('/user')
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, setUser, token]);

  // if(!token) {
  //   return <Navigate to="/homepage" />;
  // }

  useEffect(() => {
    if(!loading) {
      if(!token) {
        navigate("/homepage");
      } else if (user) {
        navigate("/dashboard");
      }
    }
  }, [loading, token, user, navigate]);

  if(loading) {
    return null;
  }

  // Redirect based on the role
  // if (user?.jabatan === 'pegawai' && location.pathname !== '/dashboard') {
  //   // return <Navigate to="/dashboard" />
  //   navigate('/dashboard');
  // } else if (user?.jabatan === 'petugas_medis' && location.pathname !== '/admin') {
  //   // return <Navigate to="/admin" />
  //   navigate('/admin');
  // }

  // if(user && location.pathname !== '/dashboard') {
  //   navigate('/dashboard');
  //   return null;
  // }

  return <Outlet />

  // return (
  //   <div>
      
  //   </div>
  // )
}
