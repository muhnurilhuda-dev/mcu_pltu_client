import { useState } from 'react';
import axiosClient from '../../../../axios-client';
import { useParams } from 'react-router-dom';

export default function PermitToWorkForm() {
  const { id_jenis_ptw } = useParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    id_jenis_ptw: parseInt(id_jenis_ptw),
    nomor_permit: '',
    diminta_oleh: '',
    rencana_pekerjaan: '',
    nomor_wo: '',
    lokasi_kerja: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
    perusahaan: '',
    persiapan_pekerjaan: {},
    identifikasi_bahaya: {},
    kontrol_pengendalian: {},
    apd: {},
    pekerja: [
      { nama: "", posisi: "", checkup: false }
    ],
    housekeeping: {},
    // signatures: [
    //   { jabatan: "Pelaksana Kerja", nama: "", tanggal: "" },
    //   { jabatan: "Supervisor", nama: "", tanggal: "" },
    //   { jabatan: "Manager Produksi", nama: "", tanggal: "" },
    //   { jabatan: "HSE / Competent Person", nama: "", tanggal: "" }
    // ]
  });
  const [errors, setErrors] = useState({});

  const checklistItems = [
    'Ventilasi cukup/dibuka untuk sirkulasi udara',
    'Memastikan semua pekerja dalam keadaan sehat',
    'Ventilasi udara darurat tersedia',
    'Penerangan tambahan tersedia',
    'Fire watcher/standby person tersedia',
    'Peralatan standar dan aman digunakan',
    'Alat bebas percikan listrik',
    'Koordinasi pekerjaan lainnya dilakukan',
    '2 way radio tersedia',
    'Guard darurat standby dan mudah diakses',
    'Instruksi khusus telah dibaca',
    'Pelayanan gawat darurat standby',
    'Sistem pemadam kebakaran fixed ready',
    'Fire blanket terpasang di tempat kerja',
    'Barikade radius 11 m dipasang',
    'Area dibersihkan dari bahan mudah terbakar',
    'Air/selang air tersedia',
    'Menggunakan APD yang standar',
    'APAR tersedia',
    'Pengecekan area mudah terbakar dilakukan',
    "Rambu 'Ada pekerjaan panas' tersedia",
  ];

  const bahayaItems = [
    'Bahan mudah terbakar',
    'Permukaan panas',
    'Gas beracun',
    'Kebisingan tinggi',
    'Benda tajam',
    'Ruang terbatas',
    'Area licin atau basah',
    'Bahan kimia berbahaya',
    'Debu atau partikel halus',
    'Sumber listrik terbuka',
  ];

  const kontrolItems = [
    'Pemasangan barricade area kerja',
    'Pemasangan tanda peringatan bahaya',
    'Menggunakan metode kerja aman',
    'Pemeriksaan peralatan sebelum digunakan',
    'Instruksi kerja tersedia di lokasi',
    'Pengawasan oleh petugas terkait',
  ];

  const apdItems = [
    'Helm',
    'Kacamata pelindung',
    'Sarung tangan',
    'Sepatu safety',
    'Pelindung telinga',
    'Masker respirator',
    'Rompi keselamatan',
    'Harness keselamatan',
  ];

  const housekeepingItems = [
    "Matikan travo/blower/panel listrik",
    "Kembalikan APD dan alat ke tempat semula",
    "Cek kebocoran gas & kran tertutup",
    "Kabel/selang digantung rapi",
    "Area dibersihkan dari potensi kebakaran",
  ];

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      const requiredFields = ['nomor_permit', 'diminta_oleh', 'rencana_pekerjaan', 'nomor_wo', 'lokasi_kerja', 'tanggal_mulai', 'tanggal_selesai', 'perusahaan'];
      requiredFields.forEach(field => {
        if (!form[field]?.trim()) {
          newErrors[field] = 'Wajib diisi';
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateWorker = (i, key, value) => {
    const updated = [...form.pekerja];
    updated[i][key] = value;
    setForm(prev => ({ ...prev, pekerja: updated }));
  };

  const addWorkerRow = () => {
    setForm(prev => ({
      ...prev,
      pekerja: [...prev.pekerja, { nama: "", posisi: "", checkup: false }]
    }));
  };

  // const updateSignature = (i, key, value) => {
  //   const updated = [...form.signatures];
  //   updated[i][key] = value;
  //   setForm(prev => ({ ...prev, signatures: updated }));
  // };


  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosClient.post('/permit-to-work', {
      ...form,
      id_jenis_ptw: parseInt(id_jenis_ptw),
    })
      .then(() => {
        alert('Permit saved successfully.');
      })
      .catch((err) => {
        const res = err.response;
        if (res && res.status === 422) {
          setErrors(res.data.errors);
        }
      });
  };

  const renderCheckboxList = (items, field) => (
    <>
      <div className='grid grid-cols-2 gap-y-4'>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${field}-${index}`}
              checked={form[field][item] || false}
              onChange={(e) => {
                setForm(prev => ({
                  ...prev,
                  [field]: {
                    ...prev[field],
                    [item]: e.target.checked,
                  },
                }));
              }}
            />
            <label htmlFor={`${field}-${index}`}>{item}</label>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="p-6 w-full mx-auto">
      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Step 1: Informasi Umum</h1>
          <form onSubmit={handleNext} className="space-y-4">
            {['nomor_permit', 'diminta_oleh', 'rencana_pekerjaan', 'nomor_wo', 'lokasi_kerja', 'tanggal_mulai', 'tanggal_selesai', 'perusahaan'].map(field => (
              <div key={field}>
                <label className="block font-semibold capitalize">{field.replace(/_/g, ' ')}</label>
                <input
                  type={field.includes('tanggal') ? 'date' : 'text'}
                  value={form[field]}
                  onChange={e => updateField(field, e.target.value)}
                  className={`w-full p-2 border rounded bg-white text-black ${errors[field] ? 'border-red-500' : ''}`}
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}
            <div className="flex justify-between">
              <div></div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Next</button>
            </div>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Step 2: Persiapan Pekerjaan</h1>
          <form onSubmit={handleNext} className="space-y-4">
            {renderCheckboxList(checklistItems, 'persiapan_pekerjaan')}
            <div className="flex justify-between">
              <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Back</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Next</button>
            </div>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Step 3: Identifikasi Bahaya</h1>
          <form onSubmit={handleNext} className="space-y-4">
            {renderCheckboxList(bahayaItems, 'identifikasi_bahaya')}
            <div className="flex justify-between">
              <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Back</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Next</button>
            </div>
          </form>
        </>
      )}

      {step === 4 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Step 4: Kontrol Pengendalian & APD</h1>
          <form onSubmit={handleNext} className="space-y-4 flex flex-col gap-y-6">
            <div>
              <h2 className="text-lg font-semibold my-2">Kontrol Pengendalian</h2>
              {renderCheckboxList(kontrolItems, 'kontrol_pengendalian')}
            </div>
            <div>
              <h2 className="text-lg font-semibold my-2">Alat Pelindung Diri (APD)</h2>
              {renderCheckboxList(apdItems, 'apd')}
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Back</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Next</button>
            </div>
          </form>
        </>
      )}

      {/* // STEP 5: Data Pekerja Terlibat */}
      {step === 5 && (
        <div>
          <h2 className="text-xl font-bold mb-2">6. Data Pekerja Terlibat</h2>
          <table className="w-full border text-sm mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">Nama Pekerja</th>
                <th className="border p-2">Posisi / Skill</th>
                <th className="border p-2">Check-up Kesehatan</th>
              </tr>
            </thead>
            <tbody>
              {form.pekerja.map((row, i) => (
                <tr key={i}>
                  <td className="border p-2">{i + 1}</td>
                  <td><input className="border p-1 w-full bg-white" value={row.nama} onChange={e => updateWorker(i, "nama", e.target.value)} /></td>
                  <td><input className="border p-1 w-full bg-white" value={row.posisi} onChange={e => updateWorker(i, "posisi", e.target.value)} /></td>
                  <td className="text-center"><input type="checkbox" checked={row.checkup} onChange={e => updateWorker(i, "checkup", e.target.checked)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addWorkerRow} className="bg-blue-500 text-white px-3 py-1 rounded mb-3">+ Tambah Baris</button>
          <div className='flex gap-x-1'>
            <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Back</button>
            <button onClick={() => setStep(6)} className="bg-green-600 text-white px-4 py-2 rounded">Lanjut</button>
          </div>
        </div>
      )}

      {/* // STEP 6: Housekeeping */}
      {step === 6 && (
        <div>
          <h2 className="text-xl font-bold mb-2">7. Proses Setelah Pekerjaan (Housekeeping)</h2>
          {housekeepingItems.map((item, idx) => (
            <label key={idx} className="block mb-2">
              <input
                type="checkbox"
                checked={form.housekeeping[item] || false}
                onChange={e => setForm(prev => ({
                  ...prev,
                  housekeeping: { ...prev.housekeeping, [item]: e.target.checked }
                }))}
                className="mr-2"
              />
              {item}
            </label>
          ))}
          <div className="flex gap-x-2 pt-4">
            <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Back</button>
            <button onClick={onSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Simpan Permit</button>
          </div>
        </div>
      )}

      {/* // STEP 7: Tanda Tangan Persetujuan */}
      {/* {step === 7 && (
        <div>
          <h2 className="text-xl font-bold mb-2">8. Tanda Tangan Persetujuan</h2>
          <table className="w-full border mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Jabatan</th>
                <th className="border p-2">Nama Lengkap</th>
                <th className="border p-2">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {form.signatures.map((s, i) => (
                <tr key={i}>
                  <td className="border p-2">{s.jabatan}</td>
                  <td><input className="border p-1 w-full" value={s.nama} onChange={e => updateSignature(i, "nama", e.target.value)} /></td>
                  <td><input type="date" className="border p-1 w-full" value={s.tanggal} onChange={e => updateSignature(i, "tanggal", e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={onSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Simpan Permit</button>
        </div>
      )} */}

    </div>
  );
}
