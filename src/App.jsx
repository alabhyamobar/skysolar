import React from 'react'
import { div } from 'three/src/nodes/math/OperatorNode.js'
import GradientBG from './Components/GradientBg'
import Services from './pages/Services'
import Faq from './pages/Faq'

const App = () => {
  return (
    <div className='w-screen overflow-x-hidden'>
      <GradientBG/>
      <Services/>
      <Faq/>
    </div>
  )
}

export default App