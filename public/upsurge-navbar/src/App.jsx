import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  const [theme, setTheme] = useState('dark');

  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme}/>
    </div>
  )
}

export default App
