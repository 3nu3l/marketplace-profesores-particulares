import styles from '../styles/Home.module.css'
import SubjectSearchBar from '../src/components/autocompleteSearch'
import { Button, Grid } from '@mui/material';
import FeatureBox from '../src/components/featureBox'
import { faCheck, faTrophy,faMagnifyingGlass  } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Clases particulares a tu medida
        </h1>

        <p /><p /><div>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item>
              <SubjectSearchBar />
            </Grid>
            <Grid item>
              <Button variant='outlined'>Buscar</Button>
            </Grid>
          </Grid>
        </div>

        <p className={styles.description}>
          Encontrá clases y profesores en el horario que más te convenga
          {/* <FontAwesomeIcon  className="icon" icon={faCheck} /> */}


        </p>

        <div>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="center">
              <FeatureBox title="BUSCÁ" description="La materia en la que necesitás ayuda" icon={faMagnifyingGlass} />
              <FeatureBox title="RESERVÁ" description="Una clase con uno de nuestros profesores" icon={faCheck} />
              <FeatureBox title="APROBÁ" description="Para ponerte a un paso más cerca de conseguir tu título" icon={faTrophy} />
          </Grid></div>
      </main>
    </div>
  )
}
