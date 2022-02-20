import React from 'react';
import {Informations} from './Informations';

const styles = {
    selectButton: {
        backgroundColor: '#0C1821',
        fontFamily: 'Amatic SC',
        color: '#CCC9DC',
    },
    width: {
        width: '30%',
    }
}

const partZero = "👋🏽🤙🏽";
const partOne = "This application makes it possible to know the number of citizens per city thanks to an API that provides this number in real time.";
const partTwo = "To access the data for a city, please select its region and department using the drop-down lists above.";
const partThree = "Thank you very much!";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            textWritten: [partZero, partOne, partTwo, partThree],
            region: [],
            dept: [],
            city: [],
        };
    }

    componentDidMount() {
        let url_region = "https://geo.api.gouv.fr/regions?fields=nom,code";

        fetch(url_region)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    region: result
                });

                const groupSelectRegion = document.getElementById('inputGroupSelectRegion');
                const listOfRegions = this.state.region;
                let opt;

                for(let index=0; index < listOfRegions.length; index++) {
                    opt = document.createElement("option");
                    opt.value = listOfRegions[index].nom.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    opt.id = listOfRegions[index].nom.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    opt.text = listOfRegions[index].nom;
                    groupSelectRegion.add(opt);
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
        const fillDeptNames = () => {
            var select = document.getElementById('inputGroupSelectRegion');
            if(select.value !== "Choose a region...") {
                var option = select.options[select.selectedIndex].text;
                let informationsAboutTheRegion = this.state.region.filter(item => item.nom === option)[0];

                let url_region = `https://geo.api.gouv.fr/regions/${informationsAboutTheRegion.code}/departements?fields=nom,code`;

                fetch(url_region)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            dept: result
                        });

                        const groupSelectDept = document.getElementById('inputGroupSelectDept');
                        groupSelectDept.focus();
                        let opt;

                        groupSelectDept.innerText = null;
                        opt = document.createElement("option");
                        opt.text = `Choose a department...`;
                        groupSelectDept.add(opt);

                        document.getElementById('inputGroupSelectCity').innerText = null;
                        opt = document.createElement("option");
                        opt.text = `Choose a city...`;
                        document.getElementById('inputGroupSelectCity').add(opt);

                        const listOfDept = this.state.dept;

                        for(let index=0; index < listOfDept.length; index++) {
                            opt = document.createElement("option");
                            opt.value = listOfDept[index].nom.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                            opt.id = listOfDept[index].nom.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                            opt.text = listOfDept[index].nom;
                            groupSelectDept.add(opt);
                        }
                    },

                    (error) => {
                        this.setState({
                            error
                        });
                    }
                )
            }
        }

        const fillCitiesNames = () => {
            var select = document.getElementById('inputGroupSelectDept');
            if(select.value !== "Choose a department...") {
                var option = select.options[select.selectedIndex].text;
                let informationsAboutTheDept = this.state.dept.filter(item => item.nom === option)[0];

                let url_dept = `https://geo.api.gouv.fr/departements/${informationsAboutTheDept.code}/communes?fields=nom,code,codesPostaux,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre`;
                
                fetch(url_dept)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            city: result
                        });

                        const groupSelectCity = document.getElementById('inputGroupSelectCity');
                        groupSelectCity.focus();
                        let opt;

                        groupSelectCity.innerText = null;
                        opt = document.createElement("option");
                        opt.text = `Choose a city...`;
                        groupSelectCity.add(opt);

                        const listOfCities = this.state.city;

                        for(let index=0; index < listOfCities.length; index++) {
                            opt = document.createElement("option");
                            opt.value = listOfCities[index].nom.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                            opt.id = listOfCities[index].nom.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                            opt.text = listOfCities[index].nom;
                            groupSelectCity.add(opt);
                        }
                    },

                    (error) => {
                        this.setState({
                            error
                        });
                    }
                )
            }
        }

        const printCityName = () => {
            var select = document.getElementById('inputGroupSelectCity');
            let informationsContainer;
            console.log(select.value)
            if(select.value !== `Choose a city...`) {
                var option = select.options[select.selectedIndex].text;
                let informationsAboutTheCity = this.state.city.filter(item => item.nom === option)[0];

                document.getElementById("nomVille").innerHTML = `🏡 ${option} 🌴`;

                document.getElementById("codeINSEE").innerHTML = `INSEE Code ${informationsAboutTheCity.code}`;

                informationsContainer = `${informationsAboutTheCity.departement.nom} (${informationsAboutTheCity.departement.code}) - ${informationsAboutTheCity.region.nom}`;
                document.getElementById("departementETregion").innerHTML = informationsContainer;

                informationsContainer = `<br />The population is <span style="color: #c2cc90">${informationsAboutTheCity.population.toLocaleString('en-GB')}</span> !`;
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
                    <select style={styles.width} className="custom-select form-select-lg mb-3" id="inputGroupSelectRegion" onChange={fillDeptNames}>
                        <option selected>Choose a region...</option>
                    </select>
                    <select style={styles.width} className="custom-select form-select-lg mb-3" id="inputGroupSelectDept" onChange={fillCitiesNames}>
                        <option selected>Choose a department...</option>
                    </select>
                    <select style={styles.width} className="custom-select form-select-lg mb-3" id="inputGroupSelectCity" onChange={printCityName}>
                        <option selected>Choose a city...</option>
                    </select>
                </div>
                <Informations textWritten={this.state.textWritten} />
            </div>
        )
    }
}