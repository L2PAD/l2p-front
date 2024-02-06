import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter} from 'next/router'
import Title from '../../assets/components/title/Title'
import Text from '../../assets/components/text/Text'
import MainBtn from '../UI/buttons/MainBtn'
import styles from '../styles/welcome.module.scss'

export default function Welcome({type}) {
  const link = useSelector((state) => state.community.opensea)
  const router = useRouter()

  return (
    <div className={styles.welcome}>
        <Title 
        type='main'
        className={styles.title} 
        title={'Welcome Entrepreneurs, Investors '}
        />
        <Text className={styles.text} 
        text={`Gain access to ${type} section by buying our NFT`}/>
        <MainBtn handler={() => router.push(link)}/>
    </div>
  )
}
