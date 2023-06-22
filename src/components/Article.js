import axios from 'axios';
import React, { useState } from 'react';

const Article = ({ article }) => {

    const [isEditing, setIsEditing] = useState(false);  // est cours d'édition ? Par défaut : false
    const [editContent, setEditContent] = useState(""); // reçoit le contenu édité (quand on clique sur le bouton Edit)

    const dateFormater = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {  // fr-FR : langue - zone géographique (ex: en-GB ou en-US)
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
        return newDate;
    };

    const handleEdit = () => {
        const data = {
            author: article.author,
            // Si editContent n'est pas vide on récupère son contenu sinon, on prend le contenu déjà existant (article.content)
            content: editContent ? editContent : article.content,
            date: article.date,
            updatedDate: Date.now(), // On ajoute le champ updatedDate dans la BDD
        };
        // On pointe sur le bon élément (article) avec son id et on lui transmet tout le contenu de "data", puis on passe setIsEditing à false
        axios.put('http://localhost:3004/articles/' + article.id, data).then(() => {
            setIsEditing(false);
        });
    };

    const handleDelete = () => {
        axios.delete("http://localhost:3004/articles/" + article.id) // On pointe sur le bon élément (article) avec son id
        window.location.reload(); // On recharge la page pour que l'article supprimé soit enlevé de l'affichage
        // D'autres méthodes existes pour enlever l'article sans recharger la page
    };

    return (
        <div className="article" style={{ background: isEditing ? "#f3feff" : "white" }}> {/* Si en cours d'édition la couleur de fond = "#f3feff" */}
            <div className="card-header">
                <h3>{article.author}</h3>
                <em>Posté le {dateFormater(article.date)}</em>  {/* em = italique */}
            </div>
            {isEditing ? (
                <textarea
                    // Si editContent existe on affiche editContent, si non, on affiche le contenu de l'article (nécéssaire si plusieurs éditions de suite)
                    defaultValue={editContent ? editContent : article.content}
                    autoFocus // Permet de mettre le curseur automatiquement dans le textarea quand on clique sur le bouton 'Edit'
                    onChange={(e) => setEditContent(e.target.value)}
                ></textarea>
            ) : (
                <p>{editContent ? editContent : article.content}</p>
                // Si isEditing(true) --> Un textarea avec le contenu (content) de l'article est affiché et set la valeur du contenu avec setEditContent()
                // Sinon, si editContent existe on affiche editContent, si non, on affiche le contenu de l'article
            )}
            <div className="btn-container">
                {isEditing ? (
                    <button onClick={() => handleEdit()}>Valider</button>
                    /* Quand on clique sur le bouton "Edit" => handleEdit() + bouton Valider  */
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    /* Quand on clique sur le bouton "Edit" => setIsEditing(true) + bouton Edit */
                )}
                <button onClick={() => {
                    if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
                        handleDelete();
                    }
                }}>Supprimer</button>
            </div>
        </div>
    );
};

export default Article;