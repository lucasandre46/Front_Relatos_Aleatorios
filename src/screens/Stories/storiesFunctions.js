import { createStory, toggleLikeStory, commentStory } from './storiesFetch';

export const handleCreatePost = async (texto, tema, setStories) => {
    if (!texto) return alert('Escreva algo!');

    const userId = localStorage.getItem('userId');
    if (!userId) return alert('Você precisa estar logado para postar!');

    const newStory = {
        texto: texto,
        tema: tema,
        id_User: userId
    };

    const result = await createStory(newStory);
    if (result) {
        window.location.reload();
    }
};

export const handleInteraction = async (type, id, data = null) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Faça login para interagir!');
        return null;
    }

    if (type === 'like') {

        return await toggleLikeStory(id, userId);
    } else if (type === 'comment') {
        const payload = {
            id_Relato: id,
            id_User: userId,
            texto: data.texto
        };
        return await commentStory(payload);
    }
};