import { loginUser } from './loginFetch';

export const handleLoginSubmit = async (email, senha) => {
    try {
        const response = await loginUser({ email, senha });

        if (response.success) {
            const userId = response.id;

            if (userId) {
                localStorage.setItem('userId', userId);
                alert('Bem-vindo!');
                window.location.href = '/stories';
            } else {
                console.error('ID do usuário não encontrado na resposta:', response);
                alert('Erro interno ao recuperar dados do usuário.');
            }
        } else {
            alert(response.message || 'Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro no handleLoginSubmit:', error);
    }
};
