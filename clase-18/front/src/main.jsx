import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './pages/App.jsx'
import { createBrowserRouter, createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './components/Layout.jsx';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Logout from './pages/Logout.jsx';

const Home = lazy(() => import('./pages/Home.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Juegos = lazy(() => import('./pages/Juegos.jsx'))
const Detalle = lazy(() => import('./pages/Detalle.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))

const router = createBrowserRouter( //createMemoryRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Suspense fallback={<div>Cargando...</div>} ><Home /></Suspense>
        },
        {
          path: "/listado",
          element: (
            <Suspense fallback={<div>Cargando...</div>} >
              <ProtectedRoute element={<Juegos />} rol={["admin", "superadmin"]} />
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
          element: <ProtectedRoute element={<Detalle />} rol={["superadmin"]} />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/salir",
          element: <Logout />
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
