import { createContext, useContext, useEffect, useState } from 'react'

const themes = {
  main: '#c10016',
  selfLove: '#efc5c3',
  voting: '#272c6c0',
  race: '#181818',
  ownIt: '#c10016',
  valentino: '#4e1214',
  cann: '#ecd2e1',
  bumbleDate: '#F8CB5E',
  bumbleBizz: '#ee7547',
  bumbleBFF: '#4098bc'
}

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('main')

  const toggleTheme = _theme => e => {
    setTheme(_theme)
  }

  useEffect(() => {
    const localPref = localStorage.getItem('wnrs-theme')
    if (localPref) {
      setTheme(localPref)
      return
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('wnrs-theme', theme)
    if (document) document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{
      theme,
      themeColor: themes[theme],
      toggleTheme,
    }}>
      <div id="themed-app">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}