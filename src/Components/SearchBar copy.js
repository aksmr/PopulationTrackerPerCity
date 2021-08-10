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
            },

            (error) => {
                this.setState({
                    error
                });
            }
        )
    }

    render() {
        
        const FindAndUpdateList = () => {
            
            const searchElement = document.getElementById('SearchBar_searchInput');
            const searchInput = searchElement.value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const myList = this.state.items;

            const result = myList.filter(item => item.nom.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchInput))
            
            let suggestion = ``;
            if(searchInput !== '') {
                result.forEach(resultItem => 
                    suggestion += `<div className="dropdown-item" href="#" onClick={() => WriteOnSearchBar()}>${resultItem.nom}</div>`
                )
            }
            document.getElementById("resultInput").innerHTML = suggestion;
        }

        const WriteOnSearchBar = (city) => {
            document.getElementById("SearchBar_searchInput").innerHTML = city;
        }
        
        return(
            <div className="dropdown">
                <input className="form-control" id='SearchBar_searchInput' type="search" placeholder="Search 🔍" aria-label="Search" onChange={FindAndUpdateList} />
                <div id="resultInput" className="suggestion"></div>
            </div>
        )
    }
}