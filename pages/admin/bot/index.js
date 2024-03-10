import HeadBlock from '../../../app/components/head/Head'
import Layout from '../../../app/admin/components/layout/index'
import TelegramBot from '../../../app/admin/pages/TelegramBot'

export default function AdminAcademy() {
  return (
    < >
      <HeadBlock title={'Admin - Telegram Bot'}/>
      <Layout>
        <TelegramBot/>
      </Layout>
    </>
  )
}
