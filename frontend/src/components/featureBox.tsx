import * as React from 'react';
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeatureBox({ icon, title, description, pageLink }) {
    const centered = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <div className={styles.grid}>
            <Link href={pageLink}>
                <a className={styles.card}>
                    <div style={{marginBottom: '1rem'}}>
                        <FontAwesomeIcon icon={icon} size="3x" className={styles.icon} style={{display: 'block', margin: 'auto'}} />
                    </div>

                    <h2 style={centered}>{title}</h2>

                    <p style={{
                        textAlign: 'center'
                    }}>{description}</p>
                </a>
            </Link>
        </div>
    );
}