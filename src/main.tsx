import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './globals.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import DeviceCompatibility from './pages/Compatibility.tsx'
import FormRedirect from './pages/FormRedirect.tsx';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/compatibility',
    element: <DeviceCompatibility/>
  },
  {
    path: '/form-redirect',
    element: <FormRedirect/>
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={browserRouter}/>
)
