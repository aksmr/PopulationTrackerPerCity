import React from 'react';

const styles = {
    footer: {
        height: 'auto',
        backgroundColor: '#282c34',
        flexShrink: 0,
        color: 'white',
        position: 'fixed',
        width: '100%',
        bottom: 0,
        left: 0,
        boxShadow: '0 -5px 5px rgba(0,0,0,.14)',
        textAlign: 'center',
        padding: '4px',
    },
    link: {
        color: '#E1DEDC',
        textDecoration: 'none',
    }
}

export const Footer = (props) => {
    return(
        <footer className="App-footer" style={styles.footer}>
            <div><strong>Copyright © 2021 SHEIKH Productions</strong></div>
            <div><small><a href="https://www.linkedin.com/in/simon-abulkalam" style={styles.link}>Simon ABUL KALAM</a></small></div>
        </footer>
    )
}