import { useState, useEffect } from 'react'
import CalendarComponent from './components/CalendarComponent'
import './App.css'

function App() {
  const [theme, setTheme] = useState('icy')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Wall Calendar</h1>
        <div className="theme-selector">
          <button 
            className={`theme-btn icy ${theme === 'icy' ? 'active' : ''}`}
            onClick={() => setTheme('icy')}
            aria-label="Icy Theme"
          ></button>
          <button 
            className={`theme-btn midnight ${theme === 'midnight' ? 'active' : ''}`}
            onClick={() => setTheme('midnight')}
            aria-label="Midnight Theme"
          ></button>
          <button 
            className={`theme-btn aurora ${theme === 'aurora' ? 'active' : ''}`}
            onClick={() => setTheme('aurora')}
            aria-label="Aurora Theme"
          ></button>
        </div>
      </header>
      
      <main className="calendar-wrapper">
        <CalendarComponent theme={theme} />
      </main>
    </div>
  )
}

export default App
