import clsx from 'clsx'
import styles from '@styles/common/icons.module.sass'

export default function PersonPlus({className, ...props}) {
  return (
    <svg viewBox="0 0 24 24" className={clsx(styles.root, className && className)} {...props}>
      <path d="M13,8c0-2.21-1.79-4-4-4S5,5.79,5,8s1.79,4,4,4S13,10.21,13,8z M15,10v2h3v3h2v-3h3v-2h-3V7h-2v3H15z M1,18v2h16v-2 c0-2.66-5.33-4-8-4S1,15.34,1,18z"/>
    </svg>
  )
}