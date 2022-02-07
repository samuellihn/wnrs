import { useTheme } from '@src/context/ThemeContext'
import { Dialog } from '@components/dialog'
import { Tick } from '@components/icons'
import * as DECKS from "@src/decks"
import styles from "@styles/dialog/themeDialog.module.sass"

export default function ThemeDialog(props) {
  const { theme, toggleTheme } = useTheme()

  const themes = Object.values(DECKS)
    .reduce((acc, { short_name, theme }) => 
      !acc.find(obj => obj.theme === theme) ? [...acc, { short_name, theme }] : acc
    , [])

  return (
    <Dialog
      title="Change Theme"
      noPadding
      {...props}
    >
      <div className={styles.themes}>
        {themes.map(({short_name, theme : _theme}) => 
          <div 
            key={short_name} 
            className={styles.theme} 
            onClick={toggleTheme(_theme)}
          >
            {_theme === theme
              ? <Tick className={styles.tick}/>
              : <div className={styles.empty}/>
            }
            <div className={styles.nameDiv}>
              <div className={styles.name}>
                {short_name}
              </div>
            </div>
            <div className={styles[`norm-${_theme}`]}>
              WNRS
            </div>
            <div className={styles[`wild-${_theme}`]}>
              WNRS
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )
}