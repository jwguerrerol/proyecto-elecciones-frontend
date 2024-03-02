import { Outlet } from "react-router-dom"
import Header from "./ui/Header"
import Footer from "./ui/Footer"

function Layout() {

  return (
      <div className="bg-grayBase h-full flex flex-col justify-between" style={{ minHeight: '100vh' }}>
        <Header />
        <Outlet />
        <Footer />
      </div>
  )
}

export default Layout
