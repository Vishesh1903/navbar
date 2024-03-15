import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme}/>
    </div>
  )
}

export default App
