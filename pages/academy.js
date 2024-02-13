import HeadBlock from '../app/components/head/Head'
import Layout from '../app/components/layout/index'
import AcademyPage from '../app/components/academyPage/AcademyPage'
import Hidden from '../app/assets/components/HiddenComponent/Hidden'

export async function getServerSideProps() {
  try{
    // const {calendar} = await getCalendar()

    if(!calendar){
      return { props: { calendar :[]} }
    }
    return { props: { calendar} }
    
  }catch(error){
    return { props: { calendar:[] } }
  }
}

export default function Academy({calendar}) {
  return (
    <>
      <HeadBlock title={'NN Academy'}/>
      <Layout>
      {/* <AcademyPage/> */}
      <Hidden>
      A bit of patience... coming soon
      </Hidden>
      </Layout>
    </>
  )
}