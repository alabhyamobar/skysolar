import React from 'react'
import Landing from './pages/Landing'
import NAV from './Components/NAV'
import Calculator from './pages/Calculator'
import Contact from './pages/Contact'
import { Routes ,Route} from 'react-router-dom'


const App = () => {
  return (
    <div className='w-screen h-screen bg-black'>
      <NAV/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/calculator' element={<Calculator/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </div>
  )
}

export default App