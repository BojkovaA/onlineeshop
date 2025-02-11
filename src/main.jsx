import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLayout from './AppLayout.jsx'
import { RouterProvider } from 'react-router-dom'

//router
import { createBrowserRouter } from 'react-router-dom'

//pages
import HomePage from './pages/HomePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: '/',
        element: <HomePage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
