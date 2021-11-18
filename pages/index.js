import Head from 'next/head';
import List from '../components/List'

export default function Home() {
  return (
    <main>
      <Head>
        <title>Bookin App - BAEQ</title>
      </Head>
      <h1>Booking App</h1>
      <List />
    </main>
  )
}
