import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/PLN.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { motion } from 'framer-motion'
export default function Navbar() {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const roles = [
    "Safety Officer",
    "Permit Applicant",
    "Medical Team",
    "Asistem Manajer K3",
  ];

  return (
    <div>
      <nav className='relative grid grid-cols-2 items-center'>
          <div className='flex items-center justify-start'>
            <img src={logo} alt="img" className='h-16 mr-10' />
            <NavLink
              to='/homepage'
              end
              className={({ isActive }) =>
                isActive ? 'mr-7 text-cyan-800 font-semibold font-poppins border-b-2 border-cyan-800 hover:text-yellow-400 hover:border-yellow-400' : 'mr-7 text-cyan-800 hover:text-yellow-400 font-poppins'
              }
            >
              Home
            </NavLink>
            <NavLink
              to='/monitoring'
              end
              className={({ isActive }) =>
                isActive ? 'mr-7 text-cyan-800 font-semibold font-poppins border-b-2 border-cyan-800 hover:text-yellow-400 hover:border-yellow-400' : 'mr-7 text-cyan-800 hover:text-yellow-400 font-poppins'
              }
            >
              Monitoring
            </NavLink>
            <NavLink
              to='/workpermit'
              end
              className={({ isActive }) =>
                isActive ? 'mr-7 text-cyan-800 font-semibold font-poppins border-b-2 border-cyan-800 hover:text-yellow-400 hover:border-yellow-400' : 'mr-7 text-cyan-800 hover:text-yellow-400 font-poppins'
              }
            >
              Work Permit
            </NavLink>
          </div>

          <div className='justify-self-end flex gap-4'>
            <Link to='/login' className="flex items-center justify-center rounded-md text-red hover:before:bg-redborder-red-500 relative h-[35px] overflow-hidden border border-red-500 bg-white px-3 text-red-500 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-2xl hover:shadow-red-500 hover:before:left-0 hover:before:w-full hover:border-red-500 focus:outline-none">
              <span className="relative z-10">Login</span>
              <FontAwesomeIcon icon={faRightToBracket} className="ml-2 relative z-10 group-hover:text-white" />
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className='flex items-center justify-center rounded-md relative h-[35px] overflow-hidden border border-green-600 bg-white px-3 text-green-600 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-green-600 before:transition-all before:duration-500 hover:text-white hover:shadow-2xl hover:shadow-green-500 hover:before:left-0 hover:before:w-full hover:border-green-600 focus:outline-none'
            >
              <span className='relative z-10'>Register</span>
              <FontAwesomeIcon icon={faUserPlus} className='ml-2 relative z-10'></FontAwesomeIcon>
            </button>
          </div>
        </nav>

        {isModelOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <motion.div
              inintial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className='bg-white rounded-lg shadow-lg p-6 w-96'
            >
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-cyan-800'> Register as</h2>
                <FontAwesomeIcon
                  icon={faTimes}
                  className='text-gray-600 cursor-pointer hover:text-red-500'
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
              <div className='flex flex-col gap-3'>
                {roles.map((role, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate(`/signup/${role.replace(/\s+/g, '_')}`)
                    }}
                    className='w-full bg-cyan-600 text-white py-2 rounded-md transition-all hover:bg-cyan-800 focus:outline-none'
                  >
                    {role}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
    </div>
  )
}
