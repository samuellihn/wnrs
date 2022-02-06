import clsx from 'clsx'
import styles from '@styles/common/icons.module.sass'

export default function Remove({className, ...props}) {
  return (
    <svg viewBox="0 0 24 24" className={clsx(styles.root, className && className)} {...props}>
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M19 13H5v-2h14v2z"/>
    </svg>
  )
}