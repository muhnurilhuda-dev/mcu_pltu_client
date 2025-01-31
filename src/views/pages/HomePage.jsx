import vector from '../../assets/images/mcu.jpg'
import lighting from '../../assets/images/lighting.png'
import humidity from '../../assets/images/humidity.png'
import dust from '../../assets/images/dust.png'
import noise from '../../assets/images/noise-pollution.png'
import { motion } from 'framer-motion'

export default function HomePage() {
  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      delay: 0.5,
      transition: {
        staggerChildren: 0.25,
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  return (
    <section className='scroll-smooth'>
      {/* <div style={{ 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
      className=' relative flex justify-center items-center'>
        <div className='absolute inset-0 bg-blue-500 opacity-50'></div>
        <h1 className='relative text-white font-bold'>Selamat Datang</h1>
      </div> */}

      <motion.div 
        variants={ parentVariants }
        initial='hidden'
        animate='show'
        className='mx-24 my-2 grid grid-cols-2 grid-flow-col items-center max-h-full'
      >
        <motion.div 
          variants={ childVariants }
          className='text-left justify-start'
        >
          <p className='text-7xl font-semibold font-poppins mb-2'>Selamat Datang</p>
          <span className='font-poppins'>di Sistem Informasi Monitoring Kesehatan Pekerja PLTU yang bertujuan untuk menjaga keberlanjutan, kesehatan, dan keselamatan untuk masa depan yang lebih baik.</span>
        </motion.div>
        <motion.div 
          variants={ childVariants }
          className='flex justify-center'
        >
          <img src={vector} alt="img" className='h-96' />
        </motion.div>
      </motion.div>

      <div className='min-h-96 bg-cyan-800 py-10'>
        <div className='flex justify-center'>
          <h1 className='text-5xl font-bold text-white font-open-sans'>Kategori Monitoring</h1>
        </div>
        <div className='grid grid-cols-4 mt-12'>
          <div className='flex flex-col justify-center border-r-4'>
            <img src={lighting} alt="img" className='w-40 self-center'/>
            <p className='text-white text-2xl self-center'>Pencahayaan</p>
          </div>
          <div className='flex flex-col justify-center border-r-4'>
            <img src={humidity} alt="img" className='w-40 self-center'/>
            <p className='text-white text-2xl self-center'>Kelembapan</p>
          </div>
          <div className='flex flex-col justify-center border-r-4'>
            <img src={dust} alt="img" className='w-40 self-center'/>
            <p className='text-white text-2xl self-center'>Debu</p>
          </div>
          <div className='flex flex-col justify-center'>
            <img src={noise} alt="img" className='w-40 self-center'/>
            <p className='text-white text-2xl self-center'>Kebisingan</p>
          </div>
        </div>
      </div>
    </section>
  )
}
