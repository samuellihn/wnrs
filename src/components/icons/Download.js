import clsx from 'clsx'
import styles from '@styles/common/icons.module.sass'

export default function Download({className, ...props}) {
  return (
    <svg viewBox="0 0 24 24" className={clsx(styles.root, className && className)} {...props}>
      <rect fill="none" height="24" width="24"/>
      <path d="M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z"/>
    </svg>
  )
}