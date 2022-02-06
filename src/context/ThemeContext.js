import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('main')

  const toggleTheme = _theme => e => setTheme(_theme)

  useEffect(() => {
    const localPref = localStorage.getItem('wnrs-theme')
    if (localPref) {
      setTheme(localPref)
      return
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('wnrs-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
    }}>
      <div id="themed-app" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}