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
    const response = await fetch(`${API_URL}/curtidas/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_Relato, id_User }),
    });
    return await response.json();
};

export const commentStory = async (dados) => {
    const response = await fetch(`${API_URL}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });
    return await response.json();
};

export const getComments = async (id_Relato) => {
    try {
        const response = await fetch(`${API_URL}/comentarios/${id_Relato}`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        return [];
    }
};
