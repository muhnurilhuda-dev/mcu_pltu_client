// import React from 'react'

export default function MakePermit() {
  return (
    <div className="mx-24 my-2">
      <div className="rounded-lg bg-white shadow-lg py-6 px-8 flex flex-col gap-3">
        <h1 className="text-2xl font-bold font-poppins">Masukkan Data</h1>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-poppins text-lg">Nama</label>
            <input type="text" name="name" id="name" className="rounded-md py-2 px-2 bg-white placeholder:text-gray-400 border border-solid border-gray-300 outline-none hover:border-gray-500 focus:border-blue-500 focus:outline-4 focus:outline-blue-300 transition-all font-poppins placeholder:font-poppins" placeholder="Masukkan Nama" required />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-poppins text-lg">Email</label>
            <input type="email" name="email" id="email" className="rounded-md py-2 px-2 bg-white placeholder:text-gray-400 border border-solid border-gray-300 outline-none hover:border-gray-500 focus:border-blue-500 focus:outline-4 focus:outline-blue-300 transition-all font-poppins placeholder:font-poppins" placeholder="Masukkan Email" required />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="jenis_permit" className="font-poppins text-lg">Jenis Permit</label>
            <select className="rounded-md py-2 px-2 bg-white border border-solid border-gray-300 outline-none hover:border-gray-500 focus:border-blue-500 focus:outline-4 focus:outline-blue-300 transition-all font-poppins placeholder:font-poppins">
              <option value="" key="" selected>Pilih jenis permit</option>
              <option value="hot_work_permit" key="">Hot Work Permit</option>
              <option value="cold_work_permit" key="">Cold Work Permit</option>
              <option value="confined_space_permit" key="">Confined Space Permit</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
