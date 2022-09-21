import * as React from 'react';
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeatureBox({ icon, title, description }) {
    const centered = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <div className={styles.grid}>
            <Link href="/">
                <a className={styles.card}>
                    <FontAwesomeIcon icon={icon} size="2x" className={styles.icon} />

                    <h2 style={centered}>{title}</h2>

                    <p style={{
                        textAlign: 'center'
                    }}>{description}</p>
                </a>
            </Link>
        </div>
    );
}