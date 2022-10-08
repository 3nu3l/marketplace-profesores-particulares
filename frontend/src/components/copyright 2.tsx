import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
    return (
        <Typography variant="body1" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://uade.edu.ar">
                UADE
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}