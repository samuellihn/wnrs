import { forwardRef } from "react";
import clsx from "clsx";
import styles from "@styles/common/button.module.sass"

function Button({ 
  children, 
  className, 
  fullWidth = false, 
  selected, 
  disableBackground, 
  contained,
  disabled,
  outlined,
  warning,
  onClick,
  themed,
  ...props 
}, ref) {

  const disabledFn = () => null

  return (
    <button ref={ref} className={clsx({
      [styles.root]: true,
      [styles.border]: !disableBackground,
      [styles.fullWidth]: fullWidth,
      [styles.themed]: themed,
      [styles.selected]: selected,
      [styles.contained]: contained,
      [styles.outlined]: outlined,
      [styles.warning]: warning,
      [styles['warning-contained']]: warning && contained,
      [styles['warning-outlined']]:  warning && outlined,
      [styles.disabled]: disabled,
      [className]: className,
    })} onClick={disabled ? disabledFn : onClick} type="button" {...props} >
      {children}
    </button>
  )
}

export default forwardRef(Button)