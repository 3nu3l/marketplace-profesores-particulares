import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from 'next/image'
import UADE from '../../public/logo_uade.svg'
import Copyright from '../components/copyright';

function ImageLogo() {
    return (
        <Image src={UADE} width={60} height={60}></Image>
    )
}


export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                pd: 3,
                width: '100%',
                //position: 'relavtive',
                bottom: 0,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <ImageLogo />
                <Copyright />
            </Container>
        </Box>
    );
}