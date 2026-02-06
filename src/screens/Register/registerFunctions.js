import { registerUser } from './registerFetch';

export const handleRegisterSubmit = async (data) => {
    console.log('Dados Cadastro:', data);
    // Validação simples
    if (!data.email.includes('@')) {
        alert('Email inválido');
        return;
    }

    try {
        const response = await registerUser(data);
        if (response.success) {
            alert('Conta criada com sucesso!');
            window.location.href = '/login';
        }
    } catch (error) {
        console.error(error);
    }
};
