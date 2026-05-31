import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from "./app.routes.jsx";
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <RouterProvider router={router}/>
    </>
  )
}

export default App