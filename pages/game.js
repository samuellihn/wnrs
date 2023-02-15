import { useRouter } from "next/router"
import Link from "next/link"
import { useState, useEffect } from "react"
import { decodeDecks, shuffle } from "@src/util/helperFn"
import * as DECKS from "@src/decks"
import { Button, Card } from "@components/common"

import styles from "@styles/game/main.module.sass"
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group"
import { MiscBar, NavBar } from "@components/game"
import Head from "next/head"
import { useTheme } from "@src/context/ThemeContext"
import { ArrowLeft } from "@src/components/icons"

const embedMeta = deck => {
  const { theme, crossover, edition, noWNRS } = deck
  return deck.questions.map(level => {
    return level.map(question => ({ 
      question, 
      meta: { theme, crossover, edition, noWNRS }
    }))
  })
}

export default function Display() {
  const router = useRouter()
  const { themeColor } = useTheme()
  const [level, setLevel] = useState(0)
  const [card, setCard] = useState(0)
 
  const names = router.query?.names 
    ? decodeURIComponent(router.query.names).split(',')
    : null

  const questions = (() => {
    if (!router.query?.decks || !router.query?.seed) return null
    const decoded = decodeDecks(router.query.decks)
    return Object.entries(decoded).reduce((acc, [slug, val]) => {
      // If not selected, return
      if (!val) return acc
      const currQuestions = embedMeta(DECKS[slug])
      if (acc.length === 0) return currQuestions
      // Push questions into respective levels
      return acc.map((level, idx) => [...level, ...currQuestions[idx] ?? []])
    }, [])
  })()

  const handleCardChange  = idx => setCard(idx)
  const handleLevelChange = idx => setLevel(idx)

  useEffect(() => {
    if (!router.isReady) return
    if (!router.query?.decks || !router.query?.seed) 
      router.replace('/', '/')
  }, [router])

  useEffect(() => {
    document.body.style = ""
  }, [])

  if (!router.query?.decks || !router.query?.seed) return null
  return (<>
  
    <Head>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="theme-color" content={themeColor}/>
    </Head>
  
    <main className={styles.root}>
    <div className={styles.inner}>
      <Link href="/" passHref>
        <Button themed disableBackground className={styles.home}>
          <ArrowLeft/>
          Main Page
        </Button>
      </Link>
      {names &&
        <div className={styles.names}>
          {`${names[card % names.length]}'s Turn`}
        </div>
      }
      <SwitchTransition>
        <CSSTransition
          key={level}
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          classNames={{
            enter: styles['fade-enter'],
            enterActive: styles['fade-enter-active'],
            exit: styles['fade-exit'],
            exitActive: styles['fade-exit-active']
          }}
        >
          <TransitionGroup className={styles.cards}>
            {shuffle(questions[level], router.query.seed)
            .slice(0, card+1)
            .map(({question, meta}, idx) => 
              <CSSTransition
                key={idx}
                in={idx < card+1}
                timeout={500}
                classNames={{
                  enter: styles['drop-enter'],
                  enterActive: styles['drop-enter-active'],
                  exit: styles['drop-exit'],
                  exitActive: styles['drop-exit-active']
                }}
                mountOnEnter
                unmountOnExit
              >
                <Card     
                  content={question} 
                  meta={meta}
                  className={styles.card}
                />
              </CSSTransition>
            )}
          </TransitionGroup>
        </CSSTransition>
      </SwitchTransition>

      <NavBar 
        onCardChange={handleCardChange}
        onLevelChange={handleLevelChange}
        levels={questions.length}
        cards={questions[level]?.length}
      />

      <MiscBar 
        className={styles.miscBar}
        question={shuffle(questions[level], router.query.seed)?.[card]?.question}
      />
    </div>
    </main>
  
  </>)
}