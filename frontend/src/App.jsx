import { useState } from 'react'
import './App.css'

import Navbar from './Components/Navbar'
import GenerateKey from "./Components/GenerateKey"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen w-full p-2'>
        <Navbar />
        <h1 className='p-2 text-center text-sm sm:text-xl font-bold mt-2 font-mono'> Generate an ACCESS_KEY to get the code snippet.<br /> Enter the email and you will get access key at the email </h1>
        <GenerateKey />
      </div>
    </>
  )
}

export default App
