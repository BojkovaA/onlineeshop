import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLayout from './AppLayout.jsx'
import { RouterProvider } from 'react-router-dom'



//router
import { createBrowserRouter } from 'react-router-dom'

//redux
import store from './store/store.js'
import { Provider } from 'react-redux'

//pages
import HomePage from './pages/HomePage.jsx'
import SingleProductPage from './pages/SingleProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import FavoritePage from './pages/FavoritePage.jsx'

//import your publish key
import { ClerkProvider} from '@clerk/clerk-react' 
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/singleProduct/:id',
        element: <SingleProductPage/>
      },
      {
        path: '/cart',
        element: <CartPage/>
      },{
        path: '/favorite',
        element: <FavoritePage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </Provider>
  </StrictMode>,
)
