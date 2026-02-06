import React, { useEffect } from 'react';
import './homeCss.css';
import { handleLoginNavigation } from './homeFunctions';
import { fetchRelatos } from './homeFetch';

const HomeScreen = () => {
    useEffect(() => {
        // Exemplo de uso do fetch ao carregar
        fetchRelatos().then(data => console.log(data));
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Relatos Aleatórios</h1>
                <p>Compartilhe suas histórias com o mundo.</p>
                <button className="login-btn" onClick={handleLoginNavigation}>
                    Login
                </button>
            </header>

            <main className="relatos-feed">
                {/* Placeholder para relatos */}
                <div className="relato-card glass">
                    <h3>Um dia inesquecível</h3>
                    <p>Era uma vez...</p>
                </div>
                <div className="relato-card glass">
                    <h3>A viagem perdida</h3>
                    <p>Tudo começou quando...</p>
                </div>
            </main>
        </div>
    );
};

export default HomeScreen;
