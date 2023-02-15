import { Button } from '@components/common'
import { Dialog } from '@components/dialog'
import { Copy, Tick } from '@components/icons'
import styles from "@styles/dialog/linkDialog.module.sass"
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Reddit, GitHub, Cafe } from '@components/icons'
import metadata from "@src/util/metadata.json"

const links = [{
  icon: <Reddit/>,
  label: 'Reddit',
  link: "https://www.reddit.com/r/cardgames/comments/nf47ps/were_not_really_strangers_online"
}, {
  icon: <GitHub/>,
  label: 'GitHub',
  link: "https://github.com/jonathan-lph/wnrs/tree/v2",
}, {
  icon: <Cafe/>,
  label: 'Tip Jar',
  link: "https://www.paypal.me/jonathanlph"
}]

export default function LinkDialog(props) {
  const router = useRouter()
  const [copied, setCopied] = useState([false, false])

  const combinedSeed = `${router.query.seed}-${router.query.decks}`

  const sections = () => [{
    label: 'Share Link',
    content: decodeURIComponent(location.href),
    clipboard: `Join me in a game of WNRS!\n${decodeURIComponent(location.href)}`,
  }, {
    label: 'Seed',
    content: combinedSeed,
    clipboard: `Join me in a game of WNRS!\nLoad a game with seed '${combinedSeed}' at ${location.origin}.`
  }]

  const handleCopy = (content, idx) => e => {
    navigator.clipboard.writeText(content)
    const temp = [...copied]
    temp[idx] = true
    setCopied(temp)
    setTimeout(() => {
      temp[idx] = false
      setCopied([...temp])
    }, 2000)
  }

  const handleOpenLink = (link, label) => e => {
    window.open(link)
  }

  if (typeof location === 'undefined') return null
  return (
    <Dialog
      title="Sharing" 
      {...props}
    >
      {sections().map(({label, content, clipboard}, idx) => 
        <div className={styles.section} key={label}>
          <div className={styles.title}>
            {label}
          </div>
          <div className={styles.preview}>
            <div className={styles.content}>
              {content}
            </div>
            <Button onClick={handleCopy(clipboard, idx)}>
              {!copied[idx] ? <Copy/> : <Tick/>}
            </Button>
          </div>
        </div>
      )}

      <div className={styles.links}> 
        {links.map(({icon, label, link}) =>
          <Button key={label} onClick={handleOpenLink(link, label)}>
            {icon}
          </Button>
        )}
      </div>

      <footer className={styles.footer}>
        {'Developed by '}
        <a href="https://github.com/jonathan-lph" rel="noreferrer" target="_blank">
          {metadata.developer}
        </a>
        {` - `}
        <a href="https://docs.google.com/document/d/1LrcuAy6t8woynvdQSc9wKWoyLY3aSGbcJCYH-9l-qBw/edit?usp=sharing" rel="noreferrer" target="_blank">
          Privacy Policy
        </a>
        <br/>
        {`v${metadata.version} - ${metadata.copyright}`}
      </footer>

    </Dialog>
  )
}