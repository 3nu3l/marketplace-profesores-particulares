import styles from '../styles/Home.module.css'
import SubjectSearchBar from '../src/components/autocompleteSearch'
import { Button, Divider, Grid } from '@mui/material';
import FeatureBox from '../src/components/featureBox'
import { faCheck, faTrophy, faMagnifyingGlass, faChalkboardUser, faFilePen, faCommentDollar } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState("")

  function search() {
    router.push({pathname: '/searchResults',
    query: {
      searchTerm:  searchTerm
    }},
    "/searchResults")
  }

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
              <Stack spacing={2} sx={{ width: 300 }}>
                <TextField
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscá materias y clases..."
                  InputProps={{
                    startAdornment: (
                        <SearchIcon style={{marginRight: 10}}/>
                    ),
                    type: 'search',
                  }}
                />
              </Stack>
            </Grid>
            <Grid item>
              <Button variant='outlined' onClick={() => search()}>Buscar</Button>
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
            alignItems="center"
            justifyContent="center">
              <Grid item>
                <FeatureBox title="BUSCÁ" description="La materia en la que necesitás ayuda" icon={faMagnifyingGlass} pageLink="signin" />
              </Grid>
              <Grid item>
                <FeatureBox title="RESERVÁ" description="Una clase con uno de nuestros profesores" icon={faCheck} pageLink="signin" />
              </Grid>
              <Grid item>
                <FeatureBox title="APROBÁ" description="Para ponerte a un paso más cerca de conseguir tu título" icon={faTrophy} pageLink="signin" />
              </Grid>
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
            alignItems="center"
            justifyContent="center">
              <Grid item>
                <FeatureBox title="REGISTRÁ" description="Tus asignaturas y horarios para los alumnos" icon={faFilePen} pageLink="teacherClasses" />
              </Grid>
              <Grid item>
                <FeatureBox title="COBRÁ" description="Establecé las tarifas que quieras por tus clases " icon={faCommentDollar} pageLink="teacherClasses" />
              </Grid>
              <Grid item>
                <FeatureBox title="ENSEÑÁ" description="En vivo directamente en la plataforma" icon={faChalkboardUser} pageLink="teacherClasses" />
              </Grid>
          </Grid>
        </div>
      </main>
    </div>
  )
}
