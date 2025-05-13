// import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, Menu, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
        setIsLoading(false)
        navigate('/homepage')
      })
  }

  if (name.jabatan === 'safety_officer') {
    user.jabatan = 'Safety Officer';
  } else if(NamedNodeMap.jabatan === 'permit_applicant') {
    user.jabatan = 'Permit Applicant';
  } else if(user.jabatan === 'tim_medis') {
    user.jabatan = 'Tim Medis';
  } else if(user.jabatan === 'asisten_manajer_k3') {
    user.jabatan = 'Asisten Manajer K3';
  }

  // let renamedRoles = {
  //   safety_officer: "Safety Officer",
  //   permit_applicant: "Permit Applicant",
  //   tim_medis: "Tim Medis",
  //   asisten_manajer_k3: "Asisten Manajer K3",
  // };

  // const renamedRole = roles.map((role) => renamedRoles[role]);

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* <h1 className="text-black">This is DASHBOARD PAGE</h1> */}
      {/* Sidebar */}
      <div className={`absolute inset-y-0 left-0 w-64 bg-cyan-800 text-white p-5 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
        <button className="md:hidden absolute top-4 right-4" onClick={() => setIsSidebarOpen(false)}>
          <X size={12} />
        </button>
        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
        <nav className='flex flex-col gap-2'>
          <ul className="space-y-4">
            <li>
              <a 
                href='/dashboard' 
                className={`flex items-center gap-2 p-2 rounded text-white hover:text-white transition-all ${window.location.pathname === '/dashboard' ? 'bg-cyan-900' : 'hover:bg-cyan-700'}`}>Dashboard
              </a>
            </li>
          </ul>
          <ul className="space-y-4">
            <li>
              <a 
                href='/workpermit' 
                className={`flex items-center gap-2 p-2 rounded text-white hover:text-white transition-all ${window.location.pathname === '/workpermit' ? 'bg-cyan-900' : 'hover:bg-cyan-700'}`}>Permit to work
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`flex flex-1 flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0 w-full"}`}>
        {/* Navbar */}
        {/* <header className="bg-white shadow-md p-4 flex items-center justify-between"> */}
        <header className={`bg-white shadow-md p-4 flex items-center justify-between transition-all ${isSidebarOpen ? 'ml-0' : 'ml-0 w-full'}`}>
          <button className='bg-none bg-transparent hover:outline-none focus:outline-none' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {/* <Menu size={24} className='text-white' /> */}
            <FontAwesomeIcon 
              icon={faBars}
              className='text-cyan-800'
            />
          </button>
          {/* <h1 className="text-xl font-bold">My App</h1> */}
          <span className="text-gray-700">Welcome, <b>{user.nama_lengkap}</b><span className='text-cyan-800 font-bold'> ({user.role})</span></span>
          {/* <span className='text-gray-700'>( {user.jabatan} )</span> */}
          <div className="flex items-center space-x-3">
            {/* <img src="https://via.placeholder.com/40" alt="User Avatar" className="w-10 h-10 rounded-full" /> */}
            <a href="#" onClick={onLogout} className='rounded-md py-2 px-4 text-white text-center bg-red-500 transition-all hover:text-white hover:bg-red-700'>
              <svg className={`${isLoading ? 'inline-block mr-2 size-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white' : 'hidden'}`} viewBox='0 0 24 24'>
                {/*  */}
              </svg>
              <span>Logout</span>
            </a>
          </div>
        </header>

        <main className="flex-1 w-full p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
