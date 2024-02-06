import HeadBlock from '../app/components/head/Head'
import getInfo from '../app/admin/services/infoServices/getInfo'
import getFooter from '../app/admin/services/footerServices/getFooter'
import NoNamePage from '../app/components/no-name/NoNamePage'
import L2P from '../app/components/l2p/L2P'

export async function getServerSideProps() {
  try{
    const {footer} = await getFooter()
    if(!footer.length){
      return { props: { footer :[]} }
    }
    return { props: { footer } }
    
  }catch(error){
    return { props: { footer:[] } }
  }
}


export default function InfoPage({footer}) {
  
  return (
    < >
        <HeadBlock title={'none'}/>
        <L2P socialLinks={footer[0]?.socialmedia || []}/>
    </>
  )
}
