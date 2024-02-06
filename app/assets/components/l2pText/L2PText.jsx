import { useState } from 'react'
import {useRouter} from 'next/navigation'
import HTMLReactParser from 'html-react-parser'
import styles from './l2p.module.scss'


const L2PText = ({data}) => {
    const [step,setStep] = useState(1)
    const {replace} = useRouter()

    const textHandler = (e) => {
        const id = e.target.id 

        if(id === 'link'){
            const link = e.target.getAttribute('data-link')
            replace(link)
            return
        }
        
        if(!id) return 

        setStep(Number(id))
    }

  return (
    <div 
    onClick={textHandler}
    className={styles.body}>
        {HTMLReactParser(data[step - 1])}
    </div>
  )
}

export default L2PText;
