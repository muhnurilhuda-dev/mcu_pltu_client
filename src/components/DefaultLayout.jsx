// import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    if(!token) {
      navigate('/homepage');
      return;
    }

    axiosClient.get('/user')
      .then(response => {
        setUser(response.data)
        const role = response.data.jabatan;
        console.log("Role: " + role);

        if(role === 'pegawai') {
          // return <Navigate to='/dashboard' />
          navigate('/dashboard')
        } 
        if (role === 'petugas_medis') {
          // return <Navigate to='/admin' />
          navigate('/admin')
        }

      })
  }, [])

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  return (
    <div>
      <header>
          <div>
            Header
          </div>
          <div>
            <span className='text-black'>{user.name}</span>
            <a href="#" onClick={onLogout} className="btn btn-success">Logout</a>
          </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
