import type { NextPage } from 'next'
import Head from 'next/head'
import { HomePage } from '../components/pages/home'

const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <Head>
          <title>Show Online</title>
          <meta name="description" content="sell, buy products online with your progressive web app which helps you reach you client easier" />
                <link rel="icon" href="/ico.svg" />
        </Head>
      </Head>

      <main >
        <HomePage />
      </main>

    </div>
  )
}

export default Home
