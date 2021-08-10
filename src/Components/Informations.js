import React from 'react';

const styles = {
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
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://geo.api.gouv.fr/departements/93/communes?fields=nom,code,codesPostaux,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    items: result
                });
                document.getElementById("nomVille").innerHTML = this.state.items[0].nom;
            },

            (error) => {
                this.setState({
                    error
                });
            }
        )
    }

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