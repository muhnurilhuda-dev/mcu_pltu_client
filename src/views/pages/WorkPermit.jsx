// import React from 'react'
import HotWorkIcon from "../../assets/images/fire-caution.png"
import ColdCaution from "../../assets/images/cold-caution.png"
import ConfinedSpace from "../../assets/images/confined-area.png"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { faEdit } from "@fortawesome/free-regular-svg-icons"

export default function WorkPermit() {
  return (
    <div className="mx-24 my-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-red-500 rounded-md px-4 py-2 grid grid-cols-4 items-center justify-between">
          <img src={HotWorkIcon} alt="icon" className="h-20" />
          <div className="col-span-3">
            <h1 className="text-lg font-bold text-white text-right">Hot Work Permit</h1>
            <h1 className="text-base text-white text-right">
              Hot Work Permit adalah izin kerja atau sistem yang memastikan pekerjaan panas hanya dilakukan oleh orang yang terlatih dan memiliki izin.
            </h1>
          </div>
        </div>

        <div className="bg-blue-400 rounded-md px-4 py-2 grid grid-cols-4 items-center justify-between">
          <img src={ColdCaution} alt="icon" className="h-20" />
          <div className="col-span-3">
            <h1 className="text-lg font-bold text-white text-right">Cold Work Permit</h1>
            <h1 className="text-base text-white text-right">
              Cold Work Permit adalah surat izin kerja dingin yang dibutuhkan untuk pekerjaan yang tidak rutin, 
              seperti perbaikan, pemeliharaan, atau konstruksi.
            </h1>
          </div>
        </div>

        <div className="bg-amber-400 rounded-md px-4 py-2 grid grid-cols-4 items-center justify-between">
          <img src={ConfinedSpace} alt="icon" className="h-20" />
          <div className="col-span-3">
            <h1 className="text-lg font-bold text-white text-right">Confined Space Permit</h1>
            <h1 className="text-base text-white text-right">
              Confined Space Permit adalah dokumen yang merupakan bagian dari prosedur keselamatan bekerja di ruang terbatas.
            </h1>
          </div>
        </div>

        <div className="bg-yellow-300 rounded-md px-4 py-2 grid grid-cols-4 items-center justify-between">
          <img src={ConfinedSpace} alt="icon" className="h-20" />
          <div className="col-span-3">
            <h1 className="text-lg font-bold text-black text-right">Working of Height Permit</h1>
            <h1 className="text-base text-black text-right">
              Confined Space Permit adalah dokumen yang merupakan bagian dari prosedur keselamatan bekerja di ruang terbatas.
            </h1>
          </div>
        </div>

        <div className="bg-lime-600 rounded-md px-4 py-2 grid grid-cols-4 items-center justify-between">
          <img src={ConfinedSpace} alt="icon" className="h-20" />
          <div className="col-span-3">
            <h1 className="text-lg font-bold text-white text-right">Critical Lifting Permit</h1>
            <h1 className="text-base text-white text-right">
              Confined Space Permit adalah dokumen yang merupakan bagian dari prosedur keselamatan bekerja di ruang terbatas.
            </h1>
          </div>
        </div>

        <div className="bg-purple-400 rounded-md px-4 py-2 grid grid-cols-4 items-center justify-between">
          <img src={ConfinedSpace} alt="icon" className="h-20" />
          <div className="col-span-3">
            <h1 className="text-lg font-bold text-white text-right">Electrical Work Permit</h1>
            <h1 className="text-base text-white text-right">
              Confined Space Permit adalah dokumen yang merupakan bagian dari prosedur keselamatan bekerja di ruang terbatas.
            </h1>
          </div>
        </div>

      </div>

      <div className="mt-5 justify-self-start">
        <Link to='/workpermit/make' className="flex items-center justify-center rounded-md text-red hover:before:bg-redborder-red-500 relative h-[35px] overflow-hidden border border-cyan-800 bg-white px-3 text-cyan-800 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-cyan-800 before:transition-all before:duration-500 hover:text-white hover:shadow-2xl hover:shadow-cyan-800 hover:before:left-0 hover:before:w-full hover:border-cyan-800 focus:outline-none">
          <span className="relative z-10">Buat work permit</span>
          <FontAwesomeIcon icon={faEdit} className="ml-2 relative z-10 group-hover:text-white" />
        </Link>
      </div>
    </div>
  )
}
