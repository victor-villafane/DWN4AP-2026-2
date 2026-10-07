import { Link, Outlet } from "react-router"
export default function Layout() {
  return (
    <div>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/listado">Listado</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
            </ul>
        </nav>
        <Outlet />
    </div>
  )
}
