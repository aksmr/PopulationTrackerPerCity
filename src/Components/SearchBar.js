import React from 'react';
import {Informations} from './Informations';

const styles = {
    selectButton: {
        backgroundColor: '#0C1821',
        fontFamily: 'Amatic SC',
        color: '#CCC9DC',
    },
    width: {
        width: '45%',
    }
}

const partZero = "👋🏽🤙🏽";
const partOne = "This application makes it possible to know the number of citizens per city thanks to an API that provides this number in real time.";
const partTwo = "To display the data for a city, please select a city from the drop-down list above.";
const partThree = "Thank you very much!";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: [],
            textWritten: [partZero, partOne, partTwo, partThree],
        };
    }

    componentDidMount() {
        // let url = `https://geo.api.gouv.fr/communes?fields=nom,code,departement,region,population&format=json&geometry=centre`;
        let url = "https://geo.api.gouv.fr/departements/93/communes?fields=nom,code,codesPostaux,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre";

        fetch(url)
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
            let informationsAboutTheCity = this.state.items.filter(item => item.nom === option)[0];
            let informationsContainer;

            if(option !== `Choose a city...`) {
                document.getElementById("nomVille").innerHTML = `🏡 ${option} 🌴`;

                document.getElementById("codeINSEE").innerHTML = `INSEE Code ${informationsAboutTheCity.code}`;

                informationsContainer = `${informationsAboutTheCity.departement.nom} (${informationsAboutTheCity.departement.code}) - ${informationsAboutTheCity.region.nom}`;
                document.getElementById("departementETregion").innerHTML = informationsContainer;

                informationsContainer = `<br />The population is <span style="color: #c2cc90">${informationsAboutTheCity.population}</span> !`;
                document.getElementById("population").innerHTML = informationsContainer;

                document.getElementById("emptyChoice").innerHTML = ``;

            } else {
                document.getElementById("nomVille").innerHTML = ``;
                document.getElementById("codeINSEE").innerHTML = ``;
                document.getElementById("departementETregion").innerHTML = ``;
                document.getElementById("population").innerHTML = ``;

                informationsContainer = `<span style="font-size: 80px;">${this.state.textWritten[0]}</span><br />
                ${this.state.textWritten[1]}<br />
                ${this.state.textWritten[2]}<br />
                <span style="color: #fe96a0;">${this.state.textWritten[3]}</span>`;
                document.getElementById("emptyChoice").innerHTML = informationsContainer;
            }
        }

        return(
            <div>
                <div class="input-group d-flex justify-content-around" style = {styles.selectButton}>
                    <select style={styles.width} className="custom-select form-select-lg mb-3" id="inputGroupSelect" onChange={printCityName}>
                        <option selected>Choose a city...</option>
                    </select>
                </div>
                <Informations textWritten={this.state.textWritten} />
            </div>
        )
    }
}