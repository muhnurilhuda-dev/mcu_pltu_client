import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axiosClient from '../../../axios-client';

const MySwal = withReactContent(Swal);

export default function useParametersModal() {
  const openModal = (mode = 'create', param = null, onUpdated = () => {}) => {
    const isEdit = mode === 'edit';

    MySwal.fire({
      title: isEdit ? 'Edit Jenis Parameter' : 'Tambah Jenis Parameter',
      html: `
        <input id="nama" class="swal2-input" placeholder="Nama" value="${param?.nama || ''}" />
        <select id="jenis_work_permit_id" class="swal2-select">
          ${param?.jenis_work_permit_options
            ?.map((jwp) =>
              `<option value="${jwp.id}" ${param?.jenis_work_permit_id === jwp.id ? 'selected' : ''}>${jwp.nama}</option>`
            )
            .join('')}
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: isEdit ? 'Update' : 'Simpan',
      preConfirm: () => {
        const nama = document.getElementById('nama').value;
        const jenis_work_permit_id = document.getElementById('jenis_work_permit_id').value;
        if (!nama || !jenis_work_permit_id) {
          Swal.showValidationMessage('Semua field wajib diisi');
        }
        return { nama, jenis_work_permit_id };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // const axios = require('../../../axios-client').default;
        const request = isEdit
          ? axiosClient.put(`/jenis-parameters/${param.id}`, result.value)
          : axiosClient.post('/jenis-parameters', result.value);

        request.then(onUpdated);
      }
    });
  };

  return openModal;
}



// import React, { useEffect, useState } from 'react'
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// import axiosClient from '../../../axios-client'

// const MySwal = withReactContent(Swal);
// export default function ParametersModal({ onUpdated }) {
//   const [jenisWorkPermits, setJenisWorkPermits] = useState([]);
//   const [jenisParameter, setJenisParameter] = useState([]);

//   useEffect(() => {
//     getJenisWorkPermits();
//     getJenisParameters();
//   });

//   const getJenisWorkPermits = () => {
//     axiosClient.get('/jenis-work-permits')
//       .then(({ data }) => setJenisWorkPermits(data));
//   }

//   const getJenisParameters = () => {
//     axiosClient.get('/jenis-parameters')
//       .then(({ data }) => setJenisParameter(data));
//   }

//   const openModal = (jenisParameters = null) => {
//     const isEdit = !!jenisParameters;

//     MySwal.fire({
//       title: isEdit ? 'Edit Jenis Parameter' : 'Tambah Jenis Parameter',
//       html: `
//         <input id="nama" class="swal2-input" placeholder="Nama Parameter" value="${jenisParameter?.nama || ''}">
//         <select id="jenis_work_permit_id" class="swal2-select">
//           ${jenisWorkPermits.map(p => `<option value="${p.id}" ${p.id === jenisParameter?.jenis_work_permit_id ? 'selected' : ''}>${p.nama}</option>`).join('')}
//         </select>
//       `,
//       showCancelButton: true,
//       confirmButtonText: isEdit ? 'Update' : 'Simpan',
//       preConfirm: () => {
//         const nama = document.getElementById('nama').value;
//         const jenis_work_permit_id = document.getElementById('jenis_work_permit_id').value;

//         if(!nama || !jenis_work_permit_id) {
//           Swal.showValidationMessage('Semua field harus diisi.');
//         }

//         const payload = { nama, jenis_work_permit_id };

//         if(isEdit) {
//           return axiosClient.put(`/jenis-parameters/${jenisParameter.id}`, payload)
//             .then(res => {
//               onUpdated?.();
//               return res.data;
//             }).catch(() => {
//               Swal.showValidationMessage('Gagal mengupdate data.');
//             })
//         } else {
//           return axiosClient.post('/jenis-parameters', payload)
//             .then(res => {
//               onUpdated?.();
//               return res.data;
//             }).catch(() => {
//               Swal.showValidationMessage('Gagal menyimpan data.');
//             })
//         }
//       }
//     })
//   }

//   return openModal;

//   // return (
//   //   <div>
      
//   //   </div>
//   // )
// }
