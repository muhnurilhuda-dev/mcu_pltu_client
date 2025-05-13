import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import ScrollAnimation from "react-animate-on-scroll";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function Signup() {
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const selectedRole = params.get("role");
  let { role } = useParams();
  let renamedRoles = {
    safety_officer: "Safety Officer",
    permit_applicant: "Permit Applicant",
    tim_medis: "Tim Medis",
    asisten_manajer_k3: "Asisten Manajer K3",
  };
  // if (role in renamedRoles) {
  //   role = renamedRoles[role];
  // }
  const renamedRole = renamedRoles[role]; // Mengubah penamaan agar penulisannya berbeda dengan value aslinya

  const nama_lengkapRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const roleRef = useRef();
  const status_aktifRef = useRef();
  const navigate = useNavigate();
  // const [role, setJabatan] = useState("");

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);

  // Reset input fields
  useEffect(() => {
    if(emailRef.current) emailRef.current.value = '';
    if(passwordRef.current) passwordRef.current.value = '';
    if(passwordConfirmationRef.current) passwordConfirmationRef.current.value = '';
  }, []);
  const onSubmit = (ev) => {
    ev.preventDefault();
    setIsLoading(true);

    const payload = {
      nama_lengkap: nama_lengkapRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      role: roleRef.current.value,
      status_aktif: status_aktifRef.current.value,
    };

    console.log(payload);
    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        navigate(data.redirect_url)
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="mx-24 my-2">
      <div className="rounded-lg bg-white shadow-lg py-6 px-8 flex flex-col gap-3">
        <h1 className="text-2xl font-bold font-poppins">Register as {renamedRole}</h1>
        {errors && (
          <div className="bg-red-300 text-red-500 p-3 rounded-lg">
            <ul>
              {Object.keys(errors).map((key) => (
                <li key={key}>{errors[key][0]}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-poppins text-lg">Nama</label>
              <input
                ref={nama_lengkapRef}
                type="text"
                placeholder="Nama Lengkap"
                autoComplete="off"
                className="mb-2 px-2 py-3 bg-white text-black placeholder:text-gray-400 rounded-lg transition-all ring-1 ring-gray-300 focus:ring-4 focus:ring-blue-300 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-poppins text-lg">Email</label>
              <input
                ref={emailRef}
                type="email"
                placeholder="Alamat email"
                autoComplete="off"
                className="mb-2 px-2 py-3 bg-white text-black placeholder:text-gray-400 rounded-lg transition-all ring-1 ring-gray-300 focus:ring-4 focus:ring-blue-300 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-poppins text-lg">Password</label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                className="mb-2 px-2 py-3 bg-white text-black placeholder:text-gray-400 rounded-lg transition-all ring-1 ring-gray-300 focus:ring-4 focus:ring-blue-300 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password_confirmation" className="font-poppins text-lg">Konfirmasi Password</label>
              <input
                ref={passwordConfirmationRef}
                type="password"
                placeholder="Ketik ulang password"
                autoComplete="new-password"
                className="mb-2 px-2 py-3 bg-white text-black placeholder:text-gray-400 rounded-lg transition-all ring-1 ring-gray-300 focus:ring-4 focus:ring-blue-300 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="role" className="font-poppins text-lg">Jabatan</label>
              <input
                type="text"
                className="mb-2 px-2 py-3 bg-gray-200 text-gray-400 placeholder:text-gray-400 rounded-lg transition-all ring-1 ring-gray-300 focus:ring-0 outline-none cursor-not-allowed"
                // value={renamedRole || ""}
                placeholder={renamedRole}
                disabled
              />
              <input
                ref={roleRef}
                type="hidden"
                value={role}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="status_aktif" className="font-poppins text-lg">Status Aktif</label>
              <input
                ref={status_aktifRef}
                type="text"
                className="mb-2 px-2 py-3 bg-gray-200 text-gray-400 placeholder:text-gray-400 rounded-lg transition-all ring-1 ring-gray-300 focus:ring-0 outline-none cursor-not-allowed"
                // value={status_aktif || ""}
                value={true}
                disabled
              />
            </div>
          </div>
          <button type="submit" className="py-2 px-4 mt-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition">
            {/* Register */}
            <svg className={`${isLoading ? 'inline-block size-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white' : 'hidden'}`}></svg>
            <span className={`${!isLoading ? 'block' : 'hidden'}`}>Register</span>
          </button>
        </form>
      </div>
    </div>
  );
}
