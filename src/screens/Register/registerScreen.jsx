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
            <div className="auth-box glass">
                <h2>Cadastro</h2>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Seu Nome"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
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
                            placeholder="********"
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
                            placeholder="(XX) XXXXX-XXXX"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Criar Conta</button>
                </form>
                <p className="switch-auth">
                    Já tem conta? <a href="/login">Voltar para Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterScreen;
