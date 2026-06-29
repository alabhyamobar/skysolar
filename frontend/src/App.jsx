import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from "./app.routes.jsx";
import CustomCursor from './components/CustomCursor';


const App = () => {
  return (
    <>
      <CustomCursor />
      <RouterProvider  router={router}/>
    </>
  )
}

export default App