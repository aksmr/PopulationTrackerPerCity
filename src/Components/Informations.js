import React from 'react';

const styles = {
    global: {
        backgroundColor: '#324A5F',
        color: '#F3F3F7',
    }
    // global: {
    //     height: 'auto',
    //     backgroundColor: '#324A5F',
    //     flexShrink: 0,
    //     color: '#CCC9DC',
    //     position: 'fixed',
    //     width: '100%',
    //     bottom: 0,
    //     left: 0,
    //     boxShadow: '0 -5px 5px rgba(0,0,0,.14)',
    //     textAlign: 'center',
    //     padding: '4px',
    // },
    // link: {
    //     color: '#CCC9DC',
    //     textDecoration: 'none',
    // }
}

export class Informations extends React.Component {
    render() {
        return(
            <div style={styles.global}>
                <div id='nomVille' style={styles.nomVille}></div>
                <div id='codeINSEE' style={styles.codeINSEE}></div>
                <div id='departementETregion' style={styles.departementETregion}></div>
                <div id='population' style={styles.population}></div>
            </div>
        )
    }
}