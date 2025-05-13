import { useState } from 'react';
import axiosClient from '../../../../axios-client';

export default function PermitToWorkForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
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
    axiosClient.post('/permit-to-work', form)
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
    </>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
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
          <form onSubmit={onSubmit} className="space-y-4">
            <h2 className="text-lg font-semibold mt-4">Kontrol Pengendalian</h2>
            {renderCheckboxList(kontrolItems, 'kontrol_pengendalian')}
            <h2 className="text-lg font-semibold mt-4">Alat Pelindung Diri (APD)</h2>
            {renderCheckboxList(apdItems, 'apd')}
            <div className="flex justify-between">
              <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Back</button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
