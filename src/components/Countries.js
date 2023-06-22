import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Countries = () => {

    const [data, setData] = useState([])
    const [rangeValue, setRangeValue] = useState(250);
    const [selectedRadio, setSelectedRadio] = useState("");
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

    // Le useEffect prend effet quand le composant est appelé
    // Dans le useEffect, les [] sont appelés "callback"
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")  // lien de l'API
            .then((res) => setData(res.data));
    }, [])

    return (
        <div className='countries'>
            <ul className="radio-container">  {/* Correspond à la barre de paramétrage noire  */}
                <input
                    type="range"
                    min="1"
                    max="250"
                    step="1"
                    title={rangeValue}
                    defaultValue={rangeValue}
                    onChange={(e) =>
                        setRangeValue(e.target.value)} />
                <span>Nombre de pays affiché(s) : {rangeValue}</span> {/* Affiche la valeur actuelle de rangeValue */}
                {radios.map((continent) => (
                    <li key={continent}>
                        {/* htmlFor du label --> connecté à l'id de l'input */}
                        <input
                            type="radio"
                            id={continent}
                            name="continentRadio"
                            checked={continent === selectedRadio} // On l'utilise pour décocher les bouton radio quand on clique sur le bouton "Annuler la recherche"
                            onChange={(e) => setSelectedRadio(e.target.id)} />
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}
            </ul>
            {selectedRadio && (<button onClick={() => setSelectedRadio("")} >Annuler la recherche</button>)}
            {/* = si un bouton radio est selectionné (selectedRadio = true) alors le bouton apparait */}
            <ul>
                {
                    data
                        .filter((country) => country.continents[0].includes(selectedRadio))
                        .sort((a, b) => b.population - a.population)  // (b-a) --> Tri décroissant (par rapport à la population)
                        .slice(0, rangeValue)  // 0 exclu, on commence à 1. Sert pour l'input range
                        .map((country, index) => (  // On créé un index pour faire office d'id
                            <Card key={index} country={country} />  // On affecte l'index comme key (doit être unique) et on lui passe comme donnée "country"
                        ))}
            </ul>
        </div>
    );
};

export default Countries;