import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Button } from "@components/common"
import { ArrowLeft, ArrowRight, DoubleArrowLeft, DoubleArrowRight } from "@components/icons"
import styles from "@styles/game/main.module.sass"


export default function NavBar({ onCardChange, onLevelChange, cards, levels }) {
  const router = useRouter()
  const [level, setLevel] = useState(0)
  const [card, setCard] = useState(0)

  const handleBack = () => {
    setCard(--card)
  }
  const handleNext = () => {
    setCard(++card)
  }
  const handlePrevLevel = () => {
    setLevel(--level)
  }
  const handleNextLevel = () => {
    setLevel(++level)
  }

  useEffect(() => {
    if (onCardChange) onCardChange(card)
  }, [card])

  useEffect(() => {
    setCard(0)
    if (onLevelChange) onLevelChange(level)
  }, [level])

  useEffect(() => {
    setCard(0)
    setLevel(0)
  }, [router.query?.decks])

  useEffect(() => {
    const handleArrowDown = e => {
      if (!e.key.startsWith('Arrow')) return
      const dir = e.key.slice(5).toLowerCase()
      switch(dir) {
        case 'left':  
          if (card > 0) handleBack()
          break
        case 'right':
          if (card < cards - 1) handleNext()
          break
        case 'down': 
          if (level > 0) handlePrevLevel()
          break
        case 'up': 
          if (level < levels -1) handleNextLevel()
          break
      }
    }
    window.addEventListener('keydown', handleArrowDown)
    return () => window.removeEventListener('keydown', handleArrowDown)
  }, [cards, levels])

  return (
    <nav className={styles.navbar}>
      <Button themed onClick={handlePrevLevel} disabled={level <= 0}>
        <DoubleArrowLeft/>
      </Button>
      <Button themed onClick={handleBack} disabled={card <= 0}>
        <ArrowLeft/>
      </Button>
      <div>
        Level {level+1} - {card+1} / {cards}
      </div>
      <Button themed onClick={handleNext} disabled={card >= cards - 1}>
        <ArrowRight/>
      </Button>
      <Button themed onClick={handleNextLevel} disabled={level >= levels - 1}>
        <DoubleArrowRight/>
      </Button>
    </nav>
  )
}