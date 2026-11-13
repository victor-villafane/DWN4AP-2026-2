import { createContext, StrictMode, useContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './pages/App.jsx'
import { createBrowserRouter, createMemoryRouter, Link } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './components/Layout.jsx';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Logout from './pages/auth/Logout.jsx';
import { SessionProvider } from './context/session.context.jsx';

const Home = lazy(() => import('./pages/Home.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Juegos = lazy(() => import('./pages/crud/Juegos.jsx'))
const Detalle = lazy(() => import('./pages/crud/Detalle.jsx'))
const Login = lazy(() => import('./pages/auth/Login.jsx'))
const NuevoJuego = lazy(() => import('./pages/crud/NuevoJuego.jsx'))
const EditarJuego = lazy(() => import('./pages/crud/EditarJuego.jsx'))
const BorrarJuego = lazy(() => import('./pages/crud/BorrarJuego.jsx'))
const Register = lazy(() => import('./pages/auth/Register.jsx'))
const Usuarios = lazy(() => import('./pages/Usuarios.jsx'))
const Auth = lazy(() => import('./pages/auth/Auth.jsx'))

const router = createBrowserRouter( //createMemoryRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Algo salió mal</h1>
          <p className="text-gray-500">Ocurrió un error inesperado. Intentá recargar la página.</p>
          <Link to="/" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Volver al inicio</Link>
        </div>
      ),
      children: [
        {
          path: "/",
          element: <Suspense fallback={<div>Cargando...</div>} ><Home /></Suspense>
        },
        {
          path: "/listado",
          element: (
            <Suspense fallback={<div>Cargando...</div>} >
              <ProtectedRoute element={<Juegos />} rol={["admin", "superadmin", "user"]} />
            </Suspense>)
        },
        {
          path: "/contact",
          element: <Suspense fallback={<div>Cargando...</div>} ><Contact /></Suspense>
        },
        {
          path: "*",
          element: <div>404</div>
        },
        {
          path: "/productos/:id",
          element: <ProtectedRoute element={<Detalle />} rol={["admin", "superadmin"]} />
        },
        {
          path: "/nuevo-juego",
          element: <ProtectedRoute element={<NuevoJuego />} rol={["admin", "superadmin"]} />
        },
        {
          path: "/editar/:id",
          element: <ProtectedRoute element={<EditarJuego />} rol={["admin", "superadmin"]} />
        },
        {
          path: "/eliminar/:id",
          element: <ProtectedRoute element={<BorrarJuego />} rol={["admin", "superadmin"]} />
        },
        {
          path: "/usuarios",
          element: <ProtectedRoute element={<Usuarios />} rol={["superadmin"]} />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/salir",
          element: <Logout />
        },
        {
          path: "/auth/callback",
          element: <Auth />
        }
      ]
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)
