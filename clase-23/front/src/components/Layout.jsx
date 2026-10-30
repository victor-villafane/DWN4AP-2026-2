import { Link, Outlet } from "react-router"
import { Bounce, ToastContainer } from "react-toastify"
import Nav from "./Nav"

export default function Layout() {
  return (
    <div>
      <Nav />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  )
}
