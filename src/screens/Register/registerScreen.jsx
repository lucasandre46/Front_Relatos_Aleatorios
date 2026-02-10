import React, { useState } from 'react';
import './registerCss.css';
import { handleRegisterSubmit } from './registerFunctions';

const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        telefone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleRegisterSubmit(formData);
    };

    return (
        <div className="register-container">
            <div className="auth-box">
                <h2>Crie sua conta</h2>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <label>Nome Completo</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Como quer ser chamado?"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Telefone</label>
                        <input
                            type="text"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Cadastrar Agora</button>
                </form>
                <p className="switch-auth">
                    Já é da comunidade? <a href="/login">Faça Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterScreen;