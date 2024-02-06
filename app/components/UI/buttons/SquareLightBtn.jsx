import React from 'react'
import styles from './square-light.module.scss'

export default function SquareBtn(
  {
    className='',
    disabled = false,
    type = 'text' ,
    btnId = 'toggle-modal',
    text,
    width = '220',
    height = '64',
    fontSize='20px',
    handler = () => {},
  }
  ) {
  if(type === 'red'){
    return (
      <button 
      disabled={disabled} 
      id={btnId} 
      onClick={handler} 
      style={{maxWidth:`${width}px`,maxHeight:`${height}px`,fontSize}} 
      className={styles.btnRed + ' ' + styles[className]}>
        {text}
     </button>
    )
  }

  return (
    <button 
    disabled={disabled} 
    id={btnId} 
    onClick={handler} 
    style={{maxWidth:`${width}px`,maxHeight:`${height}px`,fontSize}} 
    className={styles.btn + ' ' + styles[className]}>
      {text}
    </button>
  )
}
