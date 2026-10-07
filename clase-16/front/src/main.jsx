import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './pages/App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
// import Home from './pages/Home.jsx';
// import Contact from './pages/Contact.jsx';
import Layout from './components/Layout.jsx';
import { lazy, Suspense } from 'react';

const Home = lazy( () => import('./pages/Home.jsx') )
const Contact = lazy( () => import('./pages/Contact.jsx') )
const App = lazy( () => import('./pages/App.jsx') )

const router = createBrowserRouter(
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
          element: <Suspense fallback={<div>Cargando...</div>} ><App /></Suspense>
        },
        {
          path: "/contact",
          element: <Suspense fallback={<div>Cargando...</div>} ><Contact /></Suspense>
        },
        {
          path: "*",
          element: <div>404</div>
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
