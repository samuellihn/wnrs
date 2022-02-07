import { Button } from '@components/common'
import { Dialog } from '@components/dialog'
import { DeckList } from '@components/main'
import { encodeDecks, decodeDecks } from '@src/util/helperFn'
import styles from "@styles/dialog/deckDialog.module.sass"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as DECKS from "@src/decks"
import { ArrowLeft } from "@components/icons"
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import { getAnalytics, logEvent } from 'firebase/analytics'

export default function DeckDialog(props) {
  const router = useRouter()
  const [info, setInfo] = useState(null)

  const handleChange = decks => {
    logEvent(getAnalytics(), `decks`, decks)
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        decks: encodeDecks(decks)
      }
    }, undefined, { shallow: true })
  }

  const handleInfoClick = slug => e => {
    logEvent(getAnalytics(), `decks_info`, { deck: slug })
    setInfo(slug)
  }
  const handleBack = e => setInfo(null)
  
  useEffect(() => {
    setInfo(null)
  }, [props.open])

  return (
    <Dialog
      noPadding
      {...props}
      className={styles.dialog}
    >
      <SwitchTransition>
        <CSSTransition
          key={info}
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          classNames={{
            enter: styles['fade-enter'],
            enterActive: styles['fade-enter-active'],
            exit: styles['fade-exit'],
            exitActive: styles['fade-exit-right-active']
          }}
        >
          {!info
          ? <div className={styles.listContainer}>
              <DeckList 
                init={decodeDecks(router.query.decks)}
                className={styles.list}
                onChange={handleChange}
                onInfoClick={handleInfoClick}
              />
            </div>
          : <div className={clsx({
              [styles.root]: true,
              [styles[DECKS[info].theme]]: true,
            })}>
              <Button onClick={handleBack} disableBackground className={styles.back}>
                <ArrowLeft/>
              </Button>
              <div className={styles.info}>
                <div className={styles.title}>
                  {DECKS[info].name}
                </div>
                <p className={styles.description}>
                  {DECKS[info].backDesc?.join('\n\n') ?? DECKS[info].short_name}
                </p>
                {DECKS[info].preview &&
                  <p className={styles.preview}>
                    {DECKS[info].preview.join('\n\n')}
                  </p>
                }
                {DECKS[info].instruction &&
                  <p className={styles.instruction}>
                    {DECKS[info].instruction.join('\n\n')}
                  </p>
                }
              </div>
            </div>
          }
        </CSSTransition>
      </SwitchTransition>
    </Dialog>
  )
}