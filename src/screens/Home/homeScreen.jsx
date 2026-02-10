import React, { useState, useEffect } from 'react';
import './homeCss.css';
import { handleLoginNavigation } from './homeFunctions';
import { fetchRelatos } from './homeFetch';

const HomeScreen = () => {
    const [relatos, setRelatos] = useState([]);

    useEffect(() => {
        fetchRelatos().then(data => setRelatos(data));
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Relatos<span>.app</span></h1>
                <button className="login-btn" onClick={handleLoginNavigation}>
                    Entrar
                </button>
            </header>

            <main className="relatos-feed">
                {relatos.length > 0 ? (
                    relatos.map(relato => (
                        <div key={relato.id} className="relato-card">
                            <h3>{relato.title}</h3>
                            <p>{relato.content}</p>
                        </div>
                    ))
                ) : (
                    <div className="relato-card">
                        <p>Buscando novas histórias no feed...</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomeScreen;