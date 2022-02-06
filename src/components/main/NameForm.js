import { useEffect, useState } from "react"
import { Remove } from "@src/components/icons"
import styles from "@styles/main/nameForm.module.sass"
import clsx from "clsx"

export default function NameForm ({ mode, error, className, onChange }) {

  const [seed, setSeed] = useState('')
  const [names, setNames] = useState([''])

  const handleSeedChange = e => setSeed(e.target.value.toLowerCase().replace(' ', '-'))

  const handleNameChange = idx => e => {
    let _names = names.slice()
    _names.splice(idx, 1, e.target.value)
    setNames(_names)
  }

  const handleRemoveName = idx => e => {
    e.preventDefault()
    let _names = names.slice()
    _names.splice(idx, 1)
    setNames(_names)
  }

  useEffect(() => {
    if (onChange) onChange(seed, names)
  }, [seed, names])

  
  useEffect(() => {
    if (names[names.length-1])
      setNames([...names, ''])
  }, [names])

  return (
    <form className={clsx(styles.form, className && className)}>

      <label className={styles.section}>
        <div className={styles.subheader}>
          {mode === 'new'
            ? 'A word with meaning to you'
            : 'Seed'
          }
          {error &&
            <span className={styles.error}>
              {error}
            </span>
          }
        </div>
        <input
          name="seed" 
          value={seed} 
          onChange={handleSeedChange}
          className={styles.input}
        />
      </label>

      <fieldset className={styles.section}>
        <legend className={styles.subheader}>
          You and your companions&apos; name
        </legend>
        <div className={styles.names}>
          {names.map((name, idx) => 
            <div key={`name-${idx}`} className={styles.name}>
              <input
                name="name" 
                value={name} 
                onChange={handleNameChange(idx)}
                className={styles.input}
                placeholder={`Player ${idx+1}`}
              />
              {idx !== 0 && idx !== names.length-1 &&
                <button 
                  className={styles.button} 
                  onClick={handleRemoveName(idx)}
                >
                  <Remove className={styles.icon}/>
                </button>
              }
            </div>
          )}
        </div>
      </fieldset>

    </form>
  )
}