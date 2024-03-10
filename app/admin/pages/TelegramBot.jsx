import { useState } from 'react'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import TextArea from '../UI/TextAreaCustom'
import FileInput from '../UI/FileInput'
import SquareBtn from '../../components/UI/buttons/SquareLightBtn'
import sendMessageByBot from '../services/adminServices/sendMessageByBot'
import styles from '../styles/bot.module.scss'

const TelegramBot = () => {
  const [isAlert,setIsAlert] = useState(false)
  const [isSuccess,setIsSuccess] = useState(false)
  const [data,setData] = useState({text:'',img:''})

  const confirmSendMessage = async () => {
    const formData = new FormData()

    formData.append('text',data.text)
    formData.append('img',data.img)

    const {success} = await sendMessageByBot(formData)

    setIsSuccess(success)
    setIsAlert(true)
  }

  const filesHandler = (event,index,oldFile) => {
    setData((prev) => {
      return {...prev,img:event.target.files[0]}
    })
  }

  return (
    <>
    <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>Telegram Bot</h1>
        </div>
        <div className={styles.body}>
          <TextArea
          label={'Message'}
          name={'text'}
          value={data.text}
          handler={(name,value) => setData((prev) => {
            return {...prev,[name]:value}
          })}
          />
          <FileInput
          label={'Image'}
          name='img'
          value={data.img}
          handler={filesHandler}
          />
        </div>
        <div className={styles.btn}>
          <SquareBtn
          text={'Send message'}
          handler={confirmSendMessage}
          width='600'
          />
        </div>
    </div>
    <CustomAlert
    type={
      isSuccess
      ?
      'success'
      :
      'error'
    }
    title={
      isSuccess
      ?
      'Success!'
      :
      'Error!'
    }
    text={
      isSuccess
      ?
      'Message sent!'
      :
      'Message not sent!'
    }
    isVisible={isAlert}
    handler={() => setIsAlert(false)}
    />
    </>
  )
}

export default TelegramBot
