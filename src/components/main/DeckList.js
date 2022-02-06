import * as DECKS from '@src/decks'
import * as DECKS_CATEGORIES from '@src/decks/categories'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { People, PeoplePlus, Person, PersonPlus, Expansion, Tick, Info } from '@components/icons'
import styles from '@styles/main/deckList.module.sass'
import { Button } from '@components/common'

export default function DeckList({init, onChange, className, onInfoClick, props}) {

  const router = useRouter()

  const [selected, setSelected] = useState(init ?? 
    Object.fromEntries(
      Object.entries(DECKS).map(([slug, deck]) =>
        [slug, slug === 'main' ? true : false]
      )
    )
  )

  const handleSelect = deck => e => {
    const checked = Object.entries(selected).filter(([deck, val]) => val)
    // Default to main if deselects the only one
    if (checked.length === 1 && deck === checked[0][0]) {
      // Ignore deselect main if only main selected
      if (deck === 'main') return
      return setSelected({
        ...selected,
        main: true,
        [deck]: false
      })
    }
    // Disable the other expansions if mode changes or choosing standalone packs
    const prevMode = DECKS[checked[0][0]].isExpansion
    if (prevMode !== DECKS[deck].isExpansion || !prevMode) {
      const disableList = Object.fromEntries(
        Object.entries(DECKS).reduce((acc, [slug, deck]) => 
          deck.isExpansion === prevMode || !prevMode
            ? [...acc, [slug, false]] : acc
        , [])
      )
      return setSelected({
        ...selected,
        ...disableList,
        [deck]: true,
      })
    }
    setSelected({...selected, [deck]: !selected[deck]})
  }

  useEffect(() => {
    if (onChange) onChange(selected)
  }, [selected])

  return (
    <div className={clsx(styles.root, className)} {...props}>
      {Object.values(DECKS_CATEGORIES).map(category => 
        <Fragment key={category.displayName}>
          <div className={styles.category}>
            {category.displayName}
          </div>
          {Object.entries(category.decks).map(([slug, {name, short_name, players, isExpansion}]) => 
            <Fragment key={name}>
              {selected[slug]
                ? <Tick className={styles.tick}/>
                : <div className={styles.empty}/>
              }
              <div className={styles.nameDiv} onClick={handleSelect(slug)}>
                <div className={styles.name}>
                  {short_name}
                </div>
              </div>
              {onInfoClick
                ? <Button className={styles.infoButton} onClick={onInfoClick(slug)}>
                    <Info className={styles.infoIcon}/>
                  </Button>
                : <div className={styles.empty}/>
              }
              { players === '1'  ? <Person className={styles.icon}/>
              : players === '1+' ? <PersonPlus className={styles.icon}/>
              : players === '2'  ? <People className={styles.icon}/>
              : players === '2+' ? <PeoplePlus className={styles.icon}/>
              : <div className={styles.empty}/>}
              {isExpansion 
                ? <Expansion className={styles.icon}/>
                : <div className={styles.empty}/>
              }
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  )
}