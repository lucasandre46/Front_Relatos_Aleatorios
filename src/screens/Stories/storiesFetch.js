const API_URL = 'http://localhost:3000/relatos';

export const fetchStories = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar relatos:', error);
        return [];
    }
};

export const createStory = async (storyData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyData),
    });
    return await response.json();
};

export const likeStory = async (relatoId, id_User) => {

    try {
        const response = await fetch(`${API_URL}/${relatoId}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_User }),
        });
        return await response.json();
    } catch (error) {
        console.error('Erro ao curtir:', error);
    }
};

export const commentStory = async (relatoId, commentData) => {
    try {
        const response = await fetch(`${API_URL}/${relatoId}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData),
        });
        return await response.json();
    } catch (error) {
        console.error('Erro ao comentar:', error);
    }
};