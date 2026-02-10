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
            <div className="auth-box">
                <h2>Acesse sua conta</h2>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <label>E-mail</label>
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
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Sua senha secreta"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Entrar</button>
                </form>
                <p className="switch-auth">
                    Ainda não faz parte? <a href="/register">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;