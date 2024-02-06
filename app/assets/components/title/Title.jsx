import Image from 'next/image'
import icon from '../../icons/welcome-line.svg'
import styles from './title.module.scss'

export default function Title({title,width = 375,type}) {
  return (
    <h1 className={styles.title}>
      {
        type === 'main'
        ?
        <div className={styles.mainWrapper}>
          {title}
          <Image src={icon} alt='l2pad welcome'/>
        </div>
        :
        title

      }
    </h1>
  )
}
