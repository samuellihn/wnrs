import clsx from 'clsx'
import styles from '@styles/common/icons.module.sass'

export default function DoubleArrowRight({className, ...props}) {
  return (
    <svg viewBox="0 0 24 24" className={clsx(styles.root, className && className)} {...props}>
      <polygon points="6.41,6 5,7.41 9.58,12 5,16.59 6.41,18 12.41,12"/>
      <polygon points="13,6 11.59,7.41 16.17,12 11.59,16.59 13,18 19,12"/>
    </svg>
  )
}