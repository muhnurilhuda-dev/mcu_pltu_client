import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axiosClient from '../../../axios-client'

const MySwal = withReactContent(Swal)
export default function WorkPermitModal({ onUpdated }) {
  const openModal = (existingData = null) => {
    const isEdit = !!existingData;

    MySwal.fire({
      title: isEdit ? 'Edit Jenis Work Permit' : 'Tambah Jenis Work Permit',
      html: `
        <input id="nama" class="swal2-input" placeholder="Nama Work Permit" value="${existingData?.nama || ''}">
        <textarea id="deskripsi" class="swal2-textarea" placeholder="Deskripsi">${existingData?.deskripsi || ''}</textarea>
      `,
      showCancelButton: true,
      confirmButtonText: isEdit ? 'Update' : 'Simpan',
      cancelButtonText: 'Batal',
      preConfirm: () => {
        const nama = document.getElementById('nama').value;
        const deskripsi = document.getElementById('deskripsi').value;
        
        if(!nama) {
          Swal.showValidationMessage('Nama harus diisi.');
          return false;
        }

        const payload = {nama, deskripsi};
        
        if(isEdit) {
          return axiosClient.put(`/jenis-work-permits/${existingData.id}`, payload)
            .then(res => {
              onUpdated?.(); // Reload list
              return res.data;
            }).catch(() => {
              Swal.showValidationMessage('Gagal mengupdate data.');
            })
        } else {
          return axiosClient.post('/jenis-work-permits', payload)
            .then(res => {
              onUpdated?.(); // Reload list
              return res.data;
            }).catch(() => {
              Swal.showValidationMessage('Gagal menyimpan data.');
            })
        }
      }
    })
  }

  return openModal;

  // return (
  //   <div>
      
  //   </div>
  // )
}
