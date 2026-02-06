import React, { useState } from 'react';
import './loginCss.css';
import { handleLoginSubmit } from './loginFunctions';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        handleLoginSubmit(email, senha);
    };

    return (
        <div className="login-container">
            <div className="auth-box glass">
                <h2>Entrar</h2>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Senha</label>
                        <input
                            type="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="********"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Acessar</button>
                </form>
                <p className="switch-auth">
                    Não tem conta? <a href="/register">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
