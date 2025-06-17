import { Outlet } from 'react-router'
import Navbar from '../navbar/Navbar'

export default function DefaultLayout() {
  return (
    <div className='min-h-screen  bg-gradient-to-br from-slate-100 via-white to-slate-50'>
      <div className='container mx-auto py-8 md:py-5'>
        <Navbar />
        <main className=''>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
