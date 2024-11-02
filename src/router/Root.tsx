import { Outlet } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

const Root = () => {
  return (
    <div className="min-w-80">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Root
