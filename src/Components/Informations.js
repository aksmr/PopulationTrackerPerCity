import React from 'react';

const styles = {
    global: {
        backgroundColor: '#324A5F',
        color: '#F3F3F7',
        fontFamily: 'Amatic SC',
        height: 'auto',
    },
    emptyChoice: {
        color: '#F3F3F7',
        fontFamily: 'Amatic SC',
        fontSize: '50px',
        padding: '20px',
        emoji: {
            fontSize: '80px',
        },
        thankYou: {
            color: '#fe96a0',
        }
    },
    nomVille: {
        fontSize: '90px',
    },
    codeINSEE: {
        fontSize: '40px',
        color: '#f1c5af',
    },
    departementETregion: {
        fontSize: '25px',
        color: '#FADED0',
    },
    population: {
        fontSize: '60px',
    }
}

export class Informations extends React.Component {
    render() {
        return(
            <div style={styles.global}>
                <div id='emptyChoice' style={styles.emptyChoice}>
                    <span style={styles.emptyChoice.emoji}>{this.props.textWritten[0]}</span><br />
                    {this.props.textWritten[1]}<br />
                    {this.props.textWritten[2]}<br />
                    <span style={styles.emptyChoice.thankYou}>{this.props.textWritten[3]}</span>
                </div>
                <div id='nomVille' style={styles.nomVille}></div>
                <div id='codeINSEE' style={styles.codeINSEE}></div>
                <div id='departementETregion' style={styles.departementETregion}></div>
                <div id='population' style={styles.population}></div>
            </div>
        )
    }
}