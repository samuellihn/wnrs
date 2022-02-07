import clsx from "clsx"
import { Button } from "@components/common"
import { Link, Palette, Help, Expansion, Copy, Tick } from "@components/icons"
import { LinkDialog, DeckDialog, HelpDialog, ThemeDialog } from "@components/dialog"
import { useState } from "react"
import { getAnalytics, logEvent } from "firebase/analytics"

const buttons = [{
  icon: <Help/>,
  label: 'help'
}, {
  icon: <Expansion/>,
  label: 'deck',
}, {
  icon: <Copy/>,
  label: 'copy',
  copiedIcon: <Tick/>
}, {
  icon: <Link/>,
  label: 'link'
}, {
  icon: <Palette/>,
  label: 'theme',
}]

export default function MiscBar({ question, className }) {

  const [open, setOpen] = useState({
    help: false,
    deck: false,
    link: false,
    theme: false,
  })
  const [copied, setCopied] = useState(false)

  const handleOpen  = type => e => {
    logEvent(getAnalytics(), `dialog_${type}`)
    setOpen({...open, [type]: true})
  }
  const handleClose = type => e => setOpen({...open, [type]: false})
  
  const handleCopy = e => {
    let _question = question.replaceAll('\n', '')
    const _ownItRegex = new RegExp('\\[([^\\]]+)\\]\\(([^)]+)\\)', 'g')
    _question = _question.replaceAll(_ownItRegex, (match, p1, p2) => p2)
    navigator.clipboard.writeText(_question)
    logEvent(getAnalytics(), 'question_copy')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={clsx(className && className)}>
      {buttons.map(({icon, label, copiedIcon}) => 
        <Button 
          key={label} 
          themed 
          onClick={label === 'copy' ? handleCopy : handleOpen(label)}
        >
          {copied ? copiedIcon ?? icon : icon}
        </Button>
      )}

      <HelpDialog
        open={open.help}
        handleClose={handleClose('help')}
      />
      <DeckDialog
        open={open.deck}
        handleClose={handleClose('deck')}
      />
      <LinkDialog
        open={open.link}
        handleClose={handleClose('link')}
      />
      <ThemeDialog
        open={open.theme}
        handleClose={handleClose('theme')}
      />

    </div>
  )
}