import { useRef, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    setErrors(null);

    console.log(payload);
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch(err => {
        console.error(err);
        const response = err.response;
        if(response && response.status === 422) {
          if(response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
      })
  }

  return (
      <div className='flex items-center justify-center min-h-screen'>
      <div className='px-7 py-7 w-80 align-middle justify-center rounded-lg shadow-md bg-white'>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col'>
            <span className='text-black font-bold text-center mb-2 text-xl'>
              Login
            </span>
            {
              errors && <div className="w-100 px-2 py-3 align-middle justify-items-center bg-red-300 text-red-500 mb-3">
                <ul>
                  {Object.keys(errors).map(key => (
                    <li key={key}>{errors[key][0]}</li>
                  ))}
                </ul>
              </div>
            }
            <input ref={emailRef} type="email" placeholder='Email Address' className='mb-2 px-2 py-3 bg-white text-black placeholder:text-gray-400 rounded-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 outline-none' />
            <input ref={passwordRef} type="password" placeholder='Password' className='mb-2 px-2 py-3 bg-white text-black placeholder:text-gray-400 rounded-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 outline-none' />
            <button className='py-2 px-2 mt-2 align-middle justify-center rounded-md bg-blue-500 text-white font-bold hover:bg-blue-800 transition-colors'>
              Log In
            </button>
            <span className='text-black text-center mt-2'>Not registered yet? <Link to="/signup">Register here</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}
