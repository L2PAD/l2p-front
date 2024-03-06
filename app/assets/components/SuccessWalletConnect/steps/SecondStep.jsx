import Image from 'next/image'
import TwitterLogin from 'react-twitter-login';
import SquareBtn from '../../../../components/UI/buttons/SquareLightBtn'
import styles from '../success-connect.module.scss'
import xImage from '../../../img/x_logo.png'

const clientId = 'NlZpV0VLeWYyWjV6R0tsQWlyVXQ6MTpjaQ'
const clientSecret = '4YqfrtbM-nDDhL2ms45F2Ms3OxX7bHorGz1WzHjvu3YOvbFDII'
const key = 'V6YTtR9ohLbSs0SKaiG9EbNMY'
const secret = '1biTA4jYlkjf0ayhs8mKtLoO2NgNL5veQQPzfXLeO5Uub75l3g'
// AAAAAAAAAAAAAAAAAAAAAOOSsgEAAAAAm%2FoyN0b2ewVQT%2F8z%2FTK2FcePzXw%3DktlsTN17vGQYpKNcOxzCIZ4CV8ISopCGCwiFimNMLG5AkFnSWl
export default function SecondStep({steps,stepHandler,userData}) {
  const isVisible = steps.secondStep

  const authHandler = (err, data) => {
    try{
      if (err) {
        console.error('Ошибка аутентификации:', err);
      } else {
        console.log('Успешная аутентификация:', data);
        // Ваша логика после успешной аутентификации
      }
    }catch(error){

    }
  };

  return (
    isVisible
    ?
      <div className={styles.secondStep}>
        <div className={styles.discordBody}>
          <Image className={styles.discord} src={xImage} alt='X'/>
          <div className={styles.subTitle}>
          Connect X
          </div>
        </div>

        <TwitterLogin
        authCallback={authHandler}
        consumerKey={clientId}
        consumerSecret={clientSecret}
        >
          <SquareBtn 
          btnId='none'
          text='Login' 
          width='400' 
          type='red'/>
        </TwitterLogin>
      </div>
    :
    <></>
  )
}
