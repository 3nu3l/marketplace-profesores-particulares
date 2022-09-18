import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>      
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
    </div>
  )
}
