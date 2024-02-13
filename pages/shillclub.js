import HeadBlock from "../app/components/head/Head"
import Hidden from "../app/assets/components/HiddenComponent/Hidden"
import Layout from '../app/components/layout/index'

export default function Vote() { 
    return (
        <>
        <HeadBlock title={'Vote'}/>
        <Layout>
            <Hidden>
              A bit of patience... coming soon
            </Hidden>
        </Layout>
        </>
    )
}