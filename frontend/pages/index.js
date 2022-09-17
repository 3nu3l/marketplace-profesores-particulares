import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Marketplace</title>
        <meta name="description" content="Aplicación de marketplace para profesores particulares" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Marketplace de Profesores
        </h1>

        <p className={styles.description}>
          texto texto texto
        </p>

        <div className={styles.grid}>
        <a href="/" className={styles.card}>
            <h2>OPTIONS &rarr;</h2>
            <p>DESCRIPTION</p>
          </a>

          <a href="/" className={styles.card}>
            <h2>OPTIONS &rarr;</h2>
            <p>DESCRIPTION</p>
          </a>

          <a href="/" className={styles.card}>
            <h2>OPTIONS &rarr;</h2>
            <p>DESCRIPTION</p>
          </a>

          <a href="/" className={styles.card}>
            <h2>OPTIONS &rarr;</h2>
            <p>DESCRIPTION</p>
          </a>

          <a href="/" className={styles.card}>
            <h2>OPTIONS &rarr;</h2>
            <p>DESCRIPTION</p>
          </a>

          <a href="/" className={styles.card}>
            <h2>OPTIONS &rarr;</h2>
            <p>DESCRIPTION</p>
          </a>

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
