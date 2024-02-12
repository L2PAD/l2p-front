import { useEffect } from 'react'
import { useState } from 'react'
import Info from '../../assets/components/info/Info'
import Swiper from '../../assets/components/swiper/Swiper'
import getSlides from '../../admin/services/bannerServices/getSlides'
import styles from '../styles/banner.module.scss'

export default function Banner() {
    const [slides,setSlides] = useState([])

    useEffect(() => {
        getSlides().then(({slides}) => setSlides(slides))
    },[])

  return (
    <div className={styles.banner}>
        <Info title={'Featured projects'} 
        text={'Upcoming top tier projects for investing.'}/>
        <div className={styles.swipper}>
         <Swiper slides={slides}/>
        </div>
    </div>
  )
}
