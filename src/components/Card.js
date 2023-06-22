import React from 'react';

const Card = ({country}) => {

    return (
        <li className="card">
            <img src={country.flags.svg} alt={"drapeau " + country.translations.fra.common} />
            <div className="infos">
                <h2>{country.translations.fra.common}</h2>
                <h4>Cap : {country.capital}</h4>
                <p>Pop. {country.population.toLocaleString()}</p> {/* toLocaleString -> pour séparer les milliers  (ex : 10 000 ou 1 000 000) */}
            </div>
        </li>
    );
};

export default Card;