import React from 'react';



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
        return(
            <div class="input-group d-flex justify-content-around">
                <select className="custom-select form-select-lg mb-3" id="inputGroupSelect">
                    <option selected>Choose a city...</option>
                </select>
            </div>
        )
    }
}