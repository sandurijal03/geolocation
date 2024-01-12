import * as React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login/Login'
import Map from './pages/Map/Map'

const Main: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/map',
      element: <Map />,
    },
  ])

  return <RouterProvider router={router} />
}

export default Main
