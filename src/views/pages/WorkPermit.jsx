import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import axiosClient from '../../axios-client';

// Import all icons
import HotWorkIcon from "../../assets/images/fire-caution.png";
import ConfinedSpace from "../../assets/images/confined-area.png";
import WorkingAtHeight from "../../assets/images/working_at_height.png";
import VicinityWork from "../../assets/images/vicinity_work.png";

// Icon mapping
const permitIcons = {
  1: HotWorkIcon,
  2: ConfinedSpace,
  3: WorkingAtHeight,
  4: VicinityWork,
};

export default function WorkPermit() {
  const [permitTypes, setPermitTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/permit-types')
      .then(({ data }) => {
        setPermitTypes(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading permit types...</div>;
  }

  return (
    <div className="mx-24 my-2">
      <div className="grid grid-cols-2 gap-2">
        {permitTypes.map((permit) => (
          <div 
            key={permit.id_jenis_ptw}
            className="bg-red-500 rounded-md px-4 py-2 grid grid-cols-4 items-center justify-between"
            // style={{ backgroundColor: permit.warna_latar }}
          >
            <img 
              src={permitIcons[permit.id_jenis_ptw]} 
              alt="icon" 
              className="h-20" 
            />
            <div className="col-span-3">
              <h1 className="text-lg font-bold text-white text-right">
                {permit.nama_jenis_ptw}
              </h1>
              <h1 className="text-base text-white text-right">
                {permit.deskripsi}
              </h1>
              <div className="mt-5 w-1/2 justify-self-end">
                <Link 
                  to={`/workpermit/make/${permit.id_jenis_ptw}`}
                  className="flex items-center justify-center rounded-md text-red hover:before:bg-redborder-red-500 relative h-[35px] overflow-hidden border border-cyan-800 bg-white px-3 text-cyan-800 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-cyan-800 before:transition-all before:duration-500 hover:text-white hover:shadow-2xl hover:shadow-cyan-800 hover:before:left-0 hover:before:w-full hover:border-cyan-800 focus:outline-none"
                >
                  <span className="relative z-10">Buat permit</span>
                  <FontAwesomeIcon icon={faEdit} className="ml-2 relative z-10 group-hover:text-white" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}