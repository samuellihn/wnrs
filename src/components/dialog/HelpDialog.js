import { Dialog } from '@components/dialog'
import instructions from "@src/decks/instruction.json"
import styles from "@styles/dialog/helpDialog.module.sass"

export default function HelpDialog(props) {
  return (
    <Dialog
      title="How To Play"
      {...props}
    >
      <p className={styles.general}>
        {instructions.general}
      </p>
      <dl className={styles.levels}>
        {Object.values(instructions.levels).map(({label, content}) =>
          <div className={styles.level} key={label}>
            <dt className={styles.title}>
              {label}
            </dt>
            <dd className={styles.content}>
              {content}
            </dd>
          </div>
        )}
      </dl>
    </Dialog>
  )
}