import React from 'react';
import styles from './ButtonSolid.module.css';

interface ButtonSolidProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function ButtonSolid({children, ...props}: ButtonSolidProps) {

    return(<>
        <button className={styles.button} {...props}>
            {children}
        </button>
    </>);
}