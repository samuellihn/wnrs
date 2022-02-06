import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Button } from "@components/common"
import { ArrowLeft, ArrowRight, DoubleArrowLeft, DoubleArrowRight } from "@components/icons"
import styles from "@styles/game/main.module.sass"


export default function NavBar({ onCardChange, onLevelChange, cards, levels }) {
  const router = useRouter()
  const [level, setLevel] = useState(0)
  const [card, setCard] = useState(0)

  const handleBack = () => setCard(--card)
  const handleNext = () => setCard(++card)
  const handlePrevLevel = () => setLevel(--level)
  const handleNextLevel = () => setLevel(++level)

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