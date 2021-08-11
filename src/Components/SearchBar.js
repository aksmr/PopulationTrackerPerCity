import React from 'react';
import {Informations} from './Informations';

const styles = {
    selectButton: {
        backgroundColor: '#0C1821',
        fontFamily: 'Amatic SC',
        color: '#CCC9DC',
    }
}

export class SearchBar extends React.Component {
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

                const groupSelect = document.getElementById('inputGroupSelect');
                const listOfCities = this.state.items;
                let opt;
                for(let index=0; index < listOfCities.length; index++) {
                    opt = document.createElement("option");
                    opt.value = listOfCities[index].nom.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    opt.id = listOfCities[index].nom.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    opt.text = listOfCities[index].nom;
                    groupSelect.add(opt);
                }
            },

            (error) => {
                this.setState({
                    error
                });
            }
        )
    }

    render() {
        const printCityName = () => {
            var select = document.getElementById('inputGroupSelect');
            var option = select.options[select.selectedIndex].text;
            if(option !== `Choose a city...`) {
                document.getElementById("nomVille").innerHTML = option;
            } else {
                document.getElementById("nomVille").innerHTML = ``;
            }
        }

        return(
            <div>
                <div class="input-group d-flex justify-content-around" style = {styles.selectButton}>
                    <select className="custom-select form-select-lg mb-3" id="inputGroupSelect" onChange={printCityName}>
                        <option selected>Choose a city...</option>
                    </select>
                </div>
                <Informations />
            </div>
        )
    }
}