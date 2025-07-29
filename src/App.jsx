import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ButtonAppBar from './components/Appbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Communucation from './pages/Communucation'
import Catalog from './pages/Catalog'

function App() {

  return (
    <>
      <ButtonAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/communucation' element={<Communucation />} />
        <Route path='/catalog' element={<Catalog />} />
      </Routes>
    </>
  )
}

export default App
