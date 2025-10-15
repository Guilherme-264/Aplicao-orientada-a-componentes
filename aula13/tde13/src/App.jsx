import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CepCard from './componentes/CepCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CepCard/>

    </>
  )
}

export default App
