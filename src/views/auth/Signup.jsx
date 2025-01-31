import { useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import ScrollAnimation from "react-animate-on-scroll";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Signup() {
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const selectedRole = params.get("role");
  const { role } = useParams();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [jabatan, setJabatan] = useState("");

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      jabatan: jabatan,
    };

    console.log(payload);
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        console.error(err);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-7 py-7 w-80 align-middle justify-center rounded-lg shadow-md bg-white">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col">
            <span className="text-black font-bold text-center mb-2 text-xl">
              Register as {role.replace('_', ' ')}
            </span>
            {errors && (
              <div className="w-100 px-2 py-3 align-middle justify-items-center bg-red-300 text-red-500 mb-3">
                <ul>
                  {Object.keys(errors).map((key) => (
                    <li key={key}>{errors[key][0]}</li>
                  ))}
                </ul>
              </div>
            )}
            <input
              ref={nameRef}
              type="text"
              placeholder="Full Name"
              className="mb-2 px-2 py-3 bg-white text-black placeholder:text-gray-400 rounded-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              ref={emailRef}
              type="email"
              placeholder="Email Address"
              className="mb-2 px-2 py-3 bg-white text-black placeholder:text-gray-400 rounded-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="mb-2 px-2 py-3 bg-white text-black placeholder:text-gray-400 rounded-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              ref={passwordConfirmationRef}
              type="password"
              placeholder="Re-type Password"
              className="mb-2 px-2 py-3 bg-white text-black placeholder:text-gray-400 rounded-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <div className="flex flex-row align-middle justify-around mt-2">
              <div className="flex flex-row items-center">
                <input
                  type="radio"
                  id="pegawai"
                  name="jabatan"
                  value="pegawai"
                  checked={jabatan === "pegawai"}
                  onChange={() => setJabatan("pegawai")}
                  className="focus:ring-2 focus:ring-purple-500 text-purple-500 h-4 w-4"
                />
                <label
                  htmlFor="pegawai"
                  className="ml-2 text-gray-700 font-poppins"
                >
                  Pegawai
                </label>
              </div>

              <div className="flex flex-row items-center">
                <input
                  type="radio"
                  id="petugas_medis"
                  name="jabatan"
                  value="petugas_medis"
                  checked={jabatan === "petugas_medis"}
                  onChange={() => setJabatan("petugas_medis")}
                  className="focus:ring-2 focus:ring-purple-500 text-purple-500 h-4 w-4"
                />
                <label
                  htmlFor="petugas_medis"
                  className="ml-2 text-gray-700 font-poppins"
                >
                  Petugas Medis
                </label>
              </div>
            </div>
            <button className="py-2 px-2 mt-2 align-middle justify-center rounded-md bg-blue-500 text-white font-bold hover:bg-blue-800 transition-colors">
              Sign Up
            </button>
            <span className="text-black text-center mt-2">
              Already have an account? <Link to="/login">Sign In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
