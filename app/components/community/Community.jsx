import { useSelector } from 'react-redux'
import MainBtn from '../UI/buttons/MainBtn'
import styles from '../styles/community.module.scss'

export default function Community() {
  const discordLink = useSelector((state) => state.community.discord)


  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h2 className={styles.title}>Join the community</h2>
        <span className={styles.text}>Share your ideas, find new partners, 
        learn from the experienced, 
        find new tools or solution, anything you need in order to achieve success</span>
      </div>
      <div className={styles.button}>
        <a target={'_blank'} href={discordLink}>Join Us</a>
      </div>
    </div>
  )
}
