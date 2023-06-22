import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import axios from 'axios';
import Article from '../components/Article';

const Blog = () => {
    const [blogData, setBlogData] = useState([]);  // Données du blog (données de chaque article)
    const [author, setAuthor] = useState("");  // Autheur de l'article (author)
    const [content, setContent] = useState(""); // Pour gérer la taille du contenu dans le textarea (cet état reçoit le contenu du textarea)
    const [error, setError] = useState(false);  // Booléen pour savoir si oui/non taille de l'article > 100 caractères

    const getData = () => {
        axios
            .get("http://localhost:3004/articles")  // Récupère via la BDD
            .then((res) => setBlogData(res.data));
    };

    useEffect(() => getData(), []);  // [] = Callback  et  getData() --> Actualise le state de blogData

    const handleSubmit = (e) => {
        e.preventDefault();     // Bloque l'envoi du formulaire si les conditions ne sont pas remplies

        if (content.length < 100) {  // Si longueur de l'article < 100 caractères
            setError(true);
        }
        else {
            setError(false);

            axios.post("http://localhost:3004/articles", {  //  Envoie dans la BDD
                author,  // = author: author
                content,  // = content: content
                date: Date.now(),
            });

            setAuthor("");
            setContent("");
            getData()  // getData() --> Actualise le state de blogData et affiche directement le nouveau message publié
        }
    }

    return (
        <div className="blog-container">
            <Logo />
            <Navigation />
            <h1>Blog</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Nom"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}  // Nécessite un onChange pour fonctionner pour quelle soit transmise à chaque changement 
                                    // (pour avoir une valeur de base, utiliser defaultValue =)
                />
                <textarea
                    style={{ border: error ? "1px solid red" : "1px solid #61dafb" }} // bordures rouges si error = true
                    placeholder="Message"
                    onChange={(e) => setContent(e.target.value)} // Pour capturer le contenu (et donc sa taille) dans le textArea
                    value={content}  // Nécessite un onChange pour fonctionner pour quelle soit transmise à chaque changement 
                                     // (pour avoir une valeur de base, utiliser defaultValue =)
                ></textarea>
                {error && <p>Veuillez écrire un minimum de 100 caractères</p>} {/* = si error est true, alors la balise <p> est affichée */}
                <input type="submit" value="Envoyer" />
            </form>
            <ul>
                {blogData
                    .sort((a, b) => b.date - a.date)  // On tri les articles par dates décroissantes
                    .map((article) => (
                        <Article key={article.id} article={article} />
                    ))}
            </ul>
        </div>
    );
};

export default Blog;