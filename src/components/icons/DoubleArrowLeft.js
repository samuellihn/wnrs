import clsx from 'clsx'
import styles from '@styles/common/icons.module.sass'

export default function DoubleArrowLeft({className, ...props}) {
  return (
    <svg viewBox="0 0 24 24" className={clsx(styles.root, className && className)} {...props}>
      <polygon points="17.59,18 19,16.59 14.42,12 19,7.41 17.59,6 11.59,12"/>
      <polygon points="11,18 12.41,16.59 7.83,12 12.41,7.41 11,6 5,12"/>
    </svg>
  )
}