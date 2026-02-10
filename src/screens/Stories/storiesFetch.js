const API_URL = 'https://api-relatos-aleatorios-vdzb.vercel.app';

export const fetchStories = async () => {
    try {
        const response = await fetch(`${API_URL}/relatos/stories`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar relatos:', error);
        return [];
    }
};

export const createStory = async (storyData) => {
    const response = await fetch(`${API_URL}/relatos/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyData),
    });
    return await response.json();
};

export const toggleLikeStory = async (id_Relato, id_User) => {
    const response = await fetch(`${API_URL}/relatos/stories/curtir/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_Relato, id_User }),
    });
    return await response.json();
};

export const commentStory = async (dados) => {
    // Ajuste para o endpoint correto de criar comentário
    // Se o backend espera id_Relato no corpo, o endpoint pode ser /comentarios ou /relatos/stories/comentario
    // Vou tentar manter o padrão que estava antes: .../relatos/stories/comentario
    // Mas com a nova base URL: ${API_URL}/relatos/stories/comentario
    const response = await fetch(`${API_URL}/relatos/stories/comentario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });
    return await response.json();
};

export const getComments = async (id_Relato) => {
    try {
        // Restaurando o caminho original que funcionava antes da refatoração
        // Base: https://api.../relatos/stories
        // Path: /${id_Relato}/comentarios
        const response = await fetch(`${API_URL}/relatos/stories/${id_Relato}/comentarios`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        return [];
    }
};
