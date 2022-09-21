import styles from '../styles/Home.module.css'
import Link from 'next/link'
import SubjectSearchBar from '../src/components/autocompleteSearch'
import { Button, Grid } from '@mui/material';

export default function Home() {
  return (
    <div className={styles.container}>      
      <main className={styles.main}>
        <h1 className={styles.title}>
          Clases particulares a tu medida
        </h1>

        <p/><p/><div>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="center">
              <Grid item>
                <SubjectSearchBar/>
              </Grid>
              <Grid item>
                <Button variant='outlined'>Buscar</Button> 
              </Grid>
          </Grid>
        </div>
        
        <p className={styles.description}>
          Encontrá clases y profesores en el horario que más te convenga
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
