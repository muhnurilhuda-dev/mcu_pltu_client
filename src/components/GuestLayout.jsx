// import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../views/components/Navbar';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GuestLayout() {
  const {token} = useStateContext();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  })

  if(token) {
    return <Navigate to="/" />
  }

  return (
    // <div className="max-h-screen justify-center items-center">
    <div>
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0, ease: 'easeOut' }}
        className={`sticky w-dvw z-50 top-0 px-20 py-3 transition-all duration-300 ${
          isScrolled ? 'bg-white/70 backdrop-blur-md shadow-md' : 'bg-white'
        }`}
      >
        <Navbar />
      </motion.header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
