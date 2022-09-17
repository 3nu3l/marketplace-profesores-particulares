import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ResponsiveAppBar from '../src/components/navbar';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Marketplace</title>
        <meta name="description" content="Aplicación de marketplace para profesores particulares" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveAppBar />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Marketplace de Profesores
        </h1>

        <p className={styles.description}>
          texto texto texto
        </p>

        <div className={styles.grid}>
          <Link href="/">
            <a className={styles.card}>
              <h2>OPTIONS &rarr;</h2>
              <p>DESCRIPTION</p>
            </a>
          </Link>

          <Link href="/">
            <a className={styles.card}>
              <h2>OPTIONS &rarr;</h2>
              <p>DESCRIPTION</p>
            </a>
          </Link>

          <Link href="/">
            <a className={styles.card}>
              <h2>OPTIONS &rarr;</h2>
              <p>DESCRIPTION</p>
            </a>
          </Link>

          <Link href="/">
            <a className={styles.card}>
              <h2>OPTIONS &rarr;</h2>
              <p>DESCRIPTION</p>
            </a>
          </Link>

          <Link href="/">
            <a className={styles.card}>
              <h2>OPTIONS &rarr;</h2>
              <p>DESCRIPTION</p>
            </a>
          </Link>

          <Link href="/">
            <a className={styles.card}>
              <h2>OPTIONS &rarr;</h2>
              <p>DESCRIPTION</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/logo_uade.svg" alt="UADE Logo" width={80} height={26} />
        </span>
      </footer>
    </div>
  )
}
