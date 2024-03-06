import HeadBlock from '../app/components/head/Head'
import Layout from '../app/components/layout/index'
import Invite from '../app/components/invite/Invite'
import getInfo from '../app/admin/services/infoServices/getInfo'


export async function getServerSideProps() {
  try{
    const {info} = await getInfo()
    if(!info.length){
      return { props: { info :[]} }
    }
    return { props: { info } }
    
  }catch(error){
    return { props: { info:[] } }
  }
}


export default function InvitePage({info}) {
  return (
    < >
      <HeadBlock title={'Invite'}/>
      <Layout>
        <Invite/>
      </Layout>
    </>
  )
}
