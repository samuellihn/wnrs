import styles from "@styles/common/card.module.sass"
import clsx from "clsx"

export default function Card({ className, content, meta }) {
  const isWildcard = content.startsWith('Wild Card')
  const isReminder = content.startsWith('Reminder')

  const getQuestion = (question = content) => {

    const _ownItRegex = new RegExp('\\[([^\\]]+)\\]\\(([^)]+)\\)', 's')
    const _hboRegex = new RegExp(' <(.+)>', 's')

    const removeTag = str => 
        isWildcard ? str.slice(10)
      : isReminder ? str.slice(9)
      : str

    const result = question.match(_ownItRegex)
    const hboResult = question.match(_hboRegex)
    if (!result && !hboResult) return [removeTag(question)]
    if (!result && hboResult) {
      const [matched] = hboResult
      const [_question] = question.split(matched)
      return [removeTag(_question)]
    }
    const [matched, color, text] = result
    const [head, foot] = question.split(matched)
    return [
      removeTag(head),
      [color, text],
      foot
    ]
  }

  const getHBOEdition = (question = content) => {
    const _hboRegex = new RegExp(' <(.+)>', 's')
    const hboResult = question.match(_hboRegex)
    if (!hboResult) return ''
    return hboResult[1]
  }

  const ownItCardBg = meta.theme === 'ownIt' && isWildcard 
    ? getQuestion()[1][0]
    : null

  return (
    <div 
      className={clsx({
        [styles.root]: true,
        [styles[`norm-${meta.theme}`]]: !isWildcard,
        [styles[`wild-${meta.theme}`]]: isWildcard,
        [className]: className
      })} 
      style={ownItCardBg
        ? {background: ownItCardBg}
        : null
      }
    >
      <div className={styles.inner}>

        <div className={styles.empty}/>

        {isWildcard &&
          <div className={styles.wildcardLabel}>
            WildCard
          </div>
        }

        {isReminder &&
          <div className={styles.reminderLabel}>
            Reminder
          </div>
        }

        <div className={clsx({
          [styles.normal]: !isWildcard && !isReminder,
          [styles.wildcard]: isWildcard,
          [styles.reminder]: isReminder,
        })}>
          {getQuestion().map((segment, i) => {
            if (i % 2 === 0) return <span key={i}>{segment}</span>
            else return <span key={i} style={!isWildcard ? {color: segment[0]} : null}>{segment[1]}</span>
          })}
        </div>

        <div className={styles.footer}>
          <div className={styles.crossover}>
            {!meta.noWNRS && `We're Not Really Strangers`}
            {meta.crossover !== undefined &&
              `\xa0\xa0 X \xa0\xa0${meta.crossover}`}
          </div>
          <div className={styles.edition}>
            {meta.edition}{' '}
            <i>{getHBOEdition()}</i>
          </div>
        </div>

      </div>
    </div>
  )
}