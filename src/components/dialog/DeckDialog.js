import { Button } from '@components/common'
import { Dialog } from '@components/dialog'
import { DeckList } from '@components/main'
import { encodeDecks, decodeDecks, getRawQuestion } from '@src/util/helperFn'
import styles from "@styles/dialog/deckDialog.module.sass"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as DECKS from "@src/decks"
import { ArrowLeft, Download } from "@components/icons"
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import clsx from 'clsx'

export default function DeckDialog(props) {
  const router = useRouter()
  const [info, setInfo] = useState(null)

  const handleChange = decks => {
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

  const handleDownload = e => {
    const normalizeList = (attr) => {
      if (!DECKS[info][attr]) return ''
      return DECKS[info][attr]
        .map(line =>`${encodeURIComponent(getRawQuestion(line))}`)
        .join('\n') 
        + '\n\n'
    }
    let str = ''
    str += getRawQuestion(DECKS[info].name) + '\n\n'
    str += normalizeList('backDesc')
    str += '----------\n\n'
    str += normalizeList('preview')
    str += normalizeList('instruction')
    str += normalizeList('')
    str += '----------\n'
    DECKS[info].levels.forEach((level, idx) => {
      str += `\n${level.toUpperCase()}\n==========\n\n`
      str += DECKS[info].questions[idx].map(q => `${getRawQuestion(q)}`).join('\n') + '\n'
    })
    const elem = document.createElement('a')
    elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + str)
    elem.setAttribute('download', `${getRawQuestion(DECKS[info].name).split(' ').join('_')}.txt`)
    elem.style.display = 'none'
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }
  
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
              <Button 
                disableBackground
                className={styles.download}
                onClick={handleDownload} 
              >
                <Download/>
              </Button>
            </div>
          }
        </CSSTransition>
      </SwitchTransition>
    </Dialog>
  )
}