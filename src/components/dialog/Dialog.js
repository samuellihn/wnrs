import clsx from 'clsx'
import { createPortal } from 'react-dom'
import { Close } from '@components/icons'
import styles from '@styles/dialog/dialog.module.sass'
import { Button } from '@components/common'

export default function Dialog({ open, title, children, handleClose, className, noPadding }) {

  if (!open || typeof window === 'undefined') return null
  return createPortal(
    <div className={styles.backdrop}>
      <div className={styles.inner} onClick={handleClose}>
        <dialog 
          open={open}
          className={clsx(styles.root, className && className)} 
          onClick={e => e.stopPropagation()}
        >
          <Button disableBackground className={styles.close} onClick={handleClose}>
            <Close/>
          </Button>
          {title && 
            <div className={styles.title}>
              {title}
            </div>
          }
          <div className={clsx(!noPadding && styles.content)}>
            {children}
          </div>
        </dialog>
      </div>
    </div>
  ,window.document.getElementById('themed-app'))
}