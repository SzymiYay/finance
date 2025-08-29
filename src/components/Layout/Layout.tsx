import { Outlet } from 'react-router-dom'
import Copyrights from '../Copyrights/Copyrights'
import Navbar from '../Navbar/Navbar'

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Copyrights />
    </>
  )
}
