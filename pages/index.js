import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { useRouter } from "next/router"
import { CSSTransition, SwitchTransition } from "react-transition-group"

import * as DECKS from "@src/decks"
import { DeckList, NameForm } from "@src/components/main"
import { ArrowLeft, ArrowRight } from "@src/components/icons"
import { decodeDecks, encodeDecks } from "@src/util/helperFn"

import styles from "@styles/main/main.module.sass"
import Head from "next/head"
import { useTheme } from "@src/context/ThemeContext"

const validateSeed = str => {
  const arr = str.split('-')
  if (arr.length <= 1 || !arr.slice(-1)[0].length) return false
  const seed = arr.slice(0, -1).join('-')
  
  const decksCode = Number(arr.slice(-1)[0])
  if (
    isNaN(decksCode) ||
    !Number.isInteger(decksCode) || 
    decksCode < 0 || 
    decksCode > Math.pow(2, Object.keys(DECKS).length)
  ) return false
  return {
    seed,
    decksCode,
    decks: decodeDecks(decksCode)
  }
}

export default function Home() {

  const router = useRouter()
  const { themeColor } = useTheme()

  const [input, setInput] = useState({
    mode:  null,
    seed:  '',
    decks: null,
    names: ['']
  })
  const [step, setStep] = useState(0)
  const [error, setError] = useState(null)
  const mainRef = useRef()

  const handleSelectMode = mode => e => {
    setInput({...input, mode})
    setStep(mode === 'new' ? 1 : 2)
  }

  const handleDeckChange = decks => 
    setInput({...input, decks})

  const handleNameChange = (seed, names) => {
    if (input.mode === 'load' && error && validateSeed(seed))
      setError(null)
    setInput({...input, names, seed})
  }

  const handleNext = () => {
    if (step === 2 && input.mode === 'load') {
      const result = validateSeed(input.seed)
      if (!result) return setError('Invalid seed')
      setInput({
        ...input, 
        seed: result.seed, 
        decks: result.decks
      })
    }
    if (step === 2 && input.mode === 'new') {
      if (!input.seed) return setError('Empty')
    }
    setStep(++step)
  }

  const handleBack = () => {
    if (step === 1 || input.mode === 'load') setInput({...input, mode: null})
    setError(null)
    setStep(input.mode === 'load' ? 0 : --step)
  }

  useEffect(() => {
    if (step === 4) {
      if (document) {
        document.body.style.transition = "background 500ms ease-in"
        document.body.style.background = "var(--theme-main)"
      }
      const _encodedDecks = encodeDecks(input.decks)
      setTimeout(() => {
        router.push({
          pathname: '/game',
          query: {
            decks: _encodedDecks,
            seed: input.seed ? input.seed : new Date().toLocaleDateString('sv'),
            ...(input.names.length !== 1 && { names: input.names.slice(0, -1).join(',') })
          }
        })
      }, 500)
    }
  }, [step])

  useEffect(() => {
    document.body.style.background = "var(--theme-paper)"
    document.body.style.color = "var(--theme-contrastPaperText)"
  }, [])

  return (<>
  
    <Head>
      <meta name="theme-color" content={themeColor}/>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  
    <main className={clsx(styles.startRoot, step === 4 && styles.fadeToMain)}>
      <div className={styles.inner}>

        {/* Main Component */}
        <SwitchTransition>
          <CSSTransition
            key={step}
            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
            classNames={{
              enter: styles['fade-enter'],
              enterActive: styles['fade-enter-active'],
              exit: styles['fade-exit'],
              exitActive: styles['fade-exit-active']
            }}
          >
            <div className={styles.content} ref={mainRef}>
              {step === 0 &&
                <>
                  <h1 className={styles.gameName}>
                    We&apos;re Not<br/>
                    Really<br/>
                    Strangers
                  </h1>
                  <div className={styles.modes}>
                    <div
                      className={styles.mode} 
                      onClick={handleSelectMode('new')}
                    >
                      <ArrowRight className={styles.arrow}/>
                      <span>New Game</span>
                    </div>
                    <div
                      className={styles.mode} 
                      onClick={handleSelectMode('load')}
                    >
                      <ArrowRight className={styles.arrow}/>
                      <span>Load Game</span>
                    </div>
                  </div>
                </>
              }
              {input.mode === 'new' && step === 1 &&
                <>
                  <h2 className={styles.title}>
                    Decks
                  </h2>
                  <div className={styles.description}>
                    Don&apos;t worry. You may change this later.
                  </div>
                  <DeckList 
                    className={styles.list} 
                    init={input.decks ?? undefined}
                    onChange={handleDeckChange}
                  />
                </>
              }
              {step === 2 &&
                <>
                  <h2 className={styles.title}>
                    Your Game
                  </h2>
                  <div className={styles.description}>
                    Just a bit more info.
                  </div>
                  <NameForm
                    mode={input.mode}
                    error={error}
                    className={styles.nameForm}
                    onChange={handleNameChange}
                  />
                </>
              }
              {step === 3 &&
                <>
                  <h1 className={styles.gameName}>
                    Warning:<br/>
                    Feeling may arise.<br/>
                  </h1>
                  <p className={styles.gameDesc}>
                    To proceed, you understand this application is <strong>not</strong> affliated with the official WNRS and agree with this app&apos;s{' '}
                    <a href="https://docs.google.com/document/d/1LrcuAy6t8woynvdQSc9wKWoyLY3aSGbcJCYH-9l-qBw/edit?usp=sharing" rel="noreferrer" target="_blank">
                      Privacy Policy
                    </a>.
                    <br/><br/>
                    <span className={styles.offline}>
                      Add this app to your homepage for offline support.
                    </span>
                  </p>
                  <div className={styles.modes}>
                    <div
                      className={styles.mode} 
                      onClick={handleNext}
                    >
                      <ArrowRight className={styles.arrow}/>
                      <span>I&apos;m ready</span>
                    </div>
                    <div
                      className={styles.mode} 
                      onClick={handleBack}
                    >
                      <ArrowRight className={styles.arrow}/>
                      <span>Bring me back</span>
                    </div>
                  </div>
                </>
              }
            </div>
          </CSSTransition>
        </SwitchTransition>

        {/* Nav Component */}
        <SwitchTransition>
          <CSSTransition
            key={step > 0 && step < 3}
            addEndListener={(node, done) => mainRef.current.addEventListener("transitionend", done, false)}
            classNames={{
              enter: styles['fade-enter'],
              enterActive: styles['fade-enter-active'],
              exit: styles['fade-exit'],
              exitActive: styles['fade-exit-active']
            }}
          >
            <div>
              {step > 0 && step < 3 &&
                <nav className={styles.nav}>
                  <button onClick={handleBack}>
                    <ArrowLeft className={styles.arrowLeft}/>
                    Back
                  </button>
                  <button onClick={handleNext}>
                    Next
                    <ArrowRight className={styles.arrowRight}/>
                  </button>
                </nav>
              }
            </div>
          </CSSTransition>
        </SwitchTransition>

      </div>
    </main>
  </>)
}
