import styles from '../styles/Home.module.css'
import SubjectSearchBar from '../src/components/autocompleteSearch'
import { Button, Divider, Grid } from '@mui/material';
import FeatureBox from '../src/components/featureBox'
import { faCheck, faTrophy, faMagnifyingGlass, faChalkboardUser, faFilePen, faCommentDollar } from "@fortawesome/free-solid-svg-icons";

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
            alignItems="center"
            justifyContent="center">
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
        </p>

        <Divider style={{width:'100%'}} variant='middle' />

        <h1 className={styles.title} style={{marginTop: '3rem', marginBottom:'4rem'}}>
          ¿Sos estudiante?
        </h1>

        <div style={{marginBottom: '4rem'}}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="center">
              <FeatureBox title="BUSCÁ" description="La materia en la que necesitás ayuda" icon={faMagnifyingGlass} pageLink="signin" />
              <FeatureBox title="RESERVÁ" description="Una clase con uno de nuestros profesores" icon={faCheck} pageLink="signin" />
              <FeatureBox title="APROBÁ" description="Para ponerte a un paso más cerca de conseguir tu título" icon={faTrophy} pageLink="signin" />
          </Grid>
        </div>

        <Divider style={{width:'100%'}} variant='middle' />

        <h1 className={styles.title} style={{marginTop: '3rem', marginBottom:'4rem'}}>
          ¿Sos profesor?
        </h1>

        <div style={{marginBottom:'4rem'}}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="center">
              <FeatureBox title="REGISTRÁ" description="Tus asignaturas y horarios para los alumnos" icon={faFilePen} pageLink="registrationClass" />
              <FeatureBox title="COBRÁ" description="Establecé las tarifas que quieras por tus clases " icon={faCommentDollar} pageLink="registrationClass" />
              <FeatureBox title="ENSEÑÁ" description="En vivo directamente en la plataforma" icon={faChalkboardUser} pageLink="registrationClass" />
          </Grid>
        </div>
      </main>
    </div>
  )
}
