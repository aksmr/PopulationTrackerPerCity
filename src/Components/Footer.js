import React from 'react';

const styles = {
    footer: {
        height: 'auto',
        backgroundColor: '#0C1821',
        flexShrink: 0,
        color: '#CCC9DC',
        // position: 'fixed',
        width: '100%',
        bottom: 0,
        left: 0,
        boxShadow: '0 -5px 5px rgba(0,0,0,.14)',
        textAlign: 'center',
        padding: '4px',
        fontFamily: 'Amatic SC',
        fontSize: '20px',
    },
    link: {
        color: '#CCC9DC',
        textDecoration: 'none',
    }
}

export const Footer = () => {
    return(
        <footer className="App-footer" style={styles.footer}>
            <div><strong>SHEIKH Productions © {new Date().getFullYear()}</strong></div>
            <div><small>
                &gt;&gt; <a href="https://www.linkedin.com/in/simon-abulkalam" style={styles.link}>Simon ABUL KALAM</a> &lt;&lt;
            </small></div>
        </footer>
    )
}