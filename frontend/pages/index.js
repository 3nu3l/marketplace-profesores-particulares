import styles from '../styles/Home.module.css'
import SubjectSearchBar from '../src/components/autocompleteSearch'
import { Button, Grid } from '@mui/material';
import FeatureBox from '../src/components/featureBox'
import 'font-awesome/css/font-awesome.min.css';

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

        <div><Grid
          container
          spacing={2}
          direction="row"
          justify="space-between"
          alignItems="center">
            <FeatureBox
            icon="fa-solid fa-check"
            title="BUSCÁ"
            description="La materia en la que necesitás ayuda"/>

            <FeatureBox
            icon="fa-solid fa-magnifying-glass"
            title="RESERVÁ"
            description="Una clase con uno de nuestros profesores"/>

            <FeatureBox
            icon="fa-regular fa-trophy"
            title="APROBÁ"
            description="Y ponete un paso más cerca de conseguir tu título"/>
          </Grid></div>
      </main>
    </div>
  )
}
