import * as React from 'react';
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { display } from '@mui/system';

export default function FeatureBox({icon, title, description}) {
    const centered = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
    <div className={styles.grid}>
        <Link href="/">
        <a className={styles.card}>
            <i
            className={icon}
            style={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center'
            }} />

            <h2 style={centered}>{title}</h2>
            
            <p style={{
                textAlign: 'center'
            }}>{description}</p>
        </a>
        </Link>
    </div>
    );
}