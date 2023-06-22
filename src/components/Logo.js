import React from 'react';

const Logo = () => {
    return (
        <div className="logo">
            {/* Les images importées depuis la balise img (et seulement les balises img) sont accessibles dans "public" 
                (comme si elles étaient placées dans le dossier "public")
                Donc le chemin pour aller chercher notre image (logo) est : "./logo192.png" */}
            <img src="./logo192.png" alt="logo react" />
            <h3>React WorldFlags</h3>
        </div>
    );
};

export default Logo;