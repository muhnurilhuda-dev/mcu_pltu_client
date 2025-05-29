import React, { useEffect, useState } from 'react'
import JenisParametersModal from '../../components/modals/JenisParametersModal';
import axiosClient from '../../../axios-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Parameters() {
  const [jenisParameter, setJenisParameter] = useState([]);
  const [jenisWorkPermits, setJenisWorkPermits] = useState([]);
  const [loading, setLoading] = useState(true);
  const openParametersModal = JenisParametersModal({ onUpdated: () => loadJenisParameters() });

  const loadJenisParameters = () => {
    axiosClient.get('/jenis-parameters')
      .then(({ data }) => setJenisParameter(data))
      .finally(() => setLoading(false));
  }

  const loadJenisWorkPermits = () => {
    axiosClient.get('/jenis-work-permits')
      .then(({ data }) => setJenisWorkPermits(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadJenisParameters();
    loadJenisWorkPermits();
  }, []);

  if(loading) return <div>Loading Jenis Parameter...</div>

  return (
    <div className="mx-24 my-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Jenis Parameter</h1>
        <button
          onClick={() => openParametersModal('create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          <FontAwesomeIcon icon={faPlus} /> Tambah Jenis Parameter
        </button>
      </div>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Jenis Work Permit</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {jenisParameter.map((param, idx) => (
            <tr key={param.id}>
              <td className="border p-2 text-center">{idx + 1}</td>
              <td className="border p-2">{param.nama}</td>
              <td className="border p-2">{param.jenis_work_permit?.nama || '-'}</td>
              <td className="border p-2">
                <button
                  className="text-blue-600 hover:underline mr-2"
                  onClick={() => openParametersModal('edit', param)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </td>
            </tr>
          ))}
          {jenisParameter.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                Tidak ada data jenis parameter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
