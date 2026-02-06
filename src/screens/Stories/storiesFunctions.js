import { createStory, likeStory, commentStory } from './storiesFetch';

export const handleCreatePost = async (texto, tema, setStories) => {
    if (!texto) return alert('Escreva algo!');

    const userId = localStorage.getItem('userId');
    if (!userId) return alert('Você precisa estar logado para postar!');

    const newStory = {
        texto: texto,      // Nome igual ao do Prisma
        tema: tema,
        id_User: userId    // Nome igual ao do Prisma
    };

    const result = await createStory(newStory);
    if (result) {
        window.location.reload();
    }
};

export const handleInteraction = async (type, id, data = null) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return alert('Faça login para interagir!');

    if (type === 'like') {
        // Enviamos o userId para o Back saber QUEM curtiu
        await likeStory(id, userId);
        window.location.reload();
    } else if (type === 'comment') {
        await commentStory(id, data);
    }
};