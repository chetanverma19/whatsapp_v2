import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Whatsapp v2</title>
        <meta name="description" content="Welcome to TraQr Corp" />
        <link rel="icon" href="https://icons.iconarchive.com/icons/dtafalonso/android-l/256/WhatsApp-icon.png" />
      </Head>
      <Sidebar />
    </div>
  )
}
