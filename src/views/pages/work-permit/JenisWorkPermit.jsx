import React, { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import axiosClient from '../../../axios-client';
import WorkPermitModal from '../../components/modals/JenisWorkPermitModal';

import HotWorkIcon from "../../../assets/images/fire-caution.png";
import ConfinedSpace from "../../../assets/images/confined-area.png";
import WorkingAtHeight from "../../../assets/images/working_at_height.png";
import VicinityWork from "../../../assets/images/vicinity_work.png";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const permitIcons = {
  1: HotWorkIcon,
  2: ConfinedSpace,
  3: WorkingAtHeight,
  4: VicinityWork,
};

export default function JenisWorkPermit() {
  const [permitTypes, setPermitTypes] = useState([]);
  const [submittedPermits, setSubmittedPermits] = useState([]);
  const [loading, setLoading] = useState(true);
  const openWorkPermitModal = WorkPermitModal({ onUpdated: () => loadPermits() });

  const loadPermits = () => {
    axiosClient.get('/jenis-work-permits')
      .then(({ data }) => setPermitTypes(data))
      .finally(() => setLoading(false));
  }

  // Load permit types
  useEffect(() => {
    loadPermits();
  }, []);

  // Load submitted permits
  // useEffect(() => {
  //   axiosClient.get('/submitted-permits')
  //     .then(({ data }) => setSubmittedPermits(data));
  // }, []);

  if (loading) return <div>Loading permit types...</div>;

  return (
    <div className="mx-24 my-4 space-y-5">

      {/* Permit Type Cards */}
      {/* <NavLink 
        to='/workpermit/create'
        end
        className='bg-blue-500 hover:bg-blue-800 text-white hover:text-white rounded-md px-4 py-2 flex items-center justify-between transition-all'
      >
        <FontAwesomeIcon icon={faPlus} /> Tambah Work Permit
      </NavLink> */}
      <h1 className='text-2xl font-semibold justify-self-center'>Jenis Work Permit</h1>

      <button onClick={() => openWorkPermitModal()} className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-md">
        <FontAwesomeIcon icon={faPlus} /> Tambah Work Permit
      </button>

      <div className="grid grid-cols-2 gap-2">
        {permitTypes.map((permit) => (
          <div 
            key={permit.id}
            className="bg-red-500 rounded-md px-4 py-2 grid grid-cols-4 items-center justify-between"
          >
            <img 
              src={permitIcons[permit.id]} 
              alt="icon" 
              className="h-20" 
            />
            <div className="col-span-3">
              <h1 className="text-lg font-bold text-white text-right">
                {permit.nama}
              </h1>
              <h1 className="text-base text-white text-right">
                {permit.deskripsi}
              </h1>
              <div className="mt-5 w-3/4 flex justify-self-end">
                <button
                  className="bg-white text-red-500 rounded px-2 py-1 mr-2"
                  onClick={() => openWorkPermitModal(permit)}
                >
                  Edit
                </button>
                <Link 
                  to={`/workpermit/make/${permit.id}`}
                  className="flex items-center justify-center rounded-md text-red hover:before:bg-redborder-red-500 relative w-[200px] h-[35px] overflow-hidden border border-cyan-800 bg-white px-3 text-cyan-800 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-cyan-800 before:transition-all before:duration-500 hover:text-white hover:shadow-2xl hover:shadow-cyan-800 hover:before:left-0 hover:before:w-full hover:border-cyan-800 focus:outline-none"
                >
                  <span className="relative z-10">Buat permit</span>
                  <FontAwesomeIcon icon={faEdit} className="ml-2 relative z-10 group-hover:text-white" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submitted Work Permits Table */}
      {/* <div>
        <h2 className="text-xl font-bold mb-4">Submitted Work Permits</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Nama Pembuat</th>
                <th className="border px-4 py-2">Nomor Permit</th>
                <th className="border px-4 py-2">Jenis Permit</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {submittedPermits.map((permit, index) => (
                <tr key={permit.id_ptw} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{permit.nama_pembuat}</td>
                  <td className="border px-4 py-2">{permit.nomor_permit}</td>
                  <td className="border px-4 py-2">{permit.nama}</td>
                  <td className="border px-4 py-2 capitalize">{permit.status_izin}</td>
                </tr>
              ))}
              {submittedPermits.length === 0 && (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan="5">
                    Belum ada permit yang dibuat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}
