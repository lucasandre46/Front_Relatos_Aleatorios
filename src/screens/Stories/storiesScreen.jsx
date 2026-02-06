import React, { useState, useEffect } from 'react';
import './storiesCss.css';
import { fetchStories } from './storiesFetch';
import { handleCreatePost, handleInteraction } from './storiesFunctions';

const StoriesScreen = () => {
    const [stories, setStories] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('Aleatório');
    const [commentText, setCommentText] = useState({});

    const themes = ['Terror', 'Comédia', 'Drama', 'Romance', 'Sci-Fi', 'Aleatório'];

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        const data = await fetchStories();
        if (Array.isArray(data)) setStories(data);
    };

    const onPostSubmit = () => {
        handleCreatePost(newPost, selectedTheme, setStories);
        setNewPost('');
    };

    const onCommentSubmit = async (id) => {
        const text = commentText[id];
        if (text) {
            // Pegamos o ID do usuário logado para o comentário também
            const userId = localStorage.getItem('userId');
            await handleInteraction('comment', id, { texto: text, id_User: userId });
            setCommentText({ ...commentText, [id]: '' });
            loadStories();
        }
    };

    return (
        <div className="stories-container">
            {/* Criar Post */}
            <div className="create-post-box glass">
                <h3>Conte sua história</h3>
                <div className="theme-selector">
                    {themes.map(theme => (
                        <button
                            key={theme}
                            className={`theme-btn ${selectedTheme === theme ? 'active' : ''}`}
                            onClick={() => setSelectedTheme(theme)}
                        >
                            {theme}
                        </button>
                    ))}
                </div>
                <textarea
                    placeholder="Era uma vez..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <button className="publish-btn" onClick={onPostSubmit}>Publicar Relato</button>
            </div>

            {/* Feed */}
            <div className="feed">
                {stories.map(story => (
                    <div key={story.id} className="story-card glass">
                        <div className="story-header">
                            <span className="story-theme">#{story.tema}</span>
                            {/* Ajustado para story.user.nome */}
                            <span className="story-author">Por: <strong>{story.user?.nome || 'Anônimo'}</strong></span>
                        </div>
                        <p className="story-content">{story.texto}</p>

                        <div className="story-actions">
                            <button className="action-btn" onClick={() => handleInteraction('like', story.id)}>
                                {/* Ajustado para usar o contador do Prisma */}
                                ❤️ Curtir ({story._count?.curtidas || 0})
                            </button>
                            <button className="action-btn">
                                💬 Comentar ({story._count?.comentarios || 0})
                            </button>
                        </div>

                        <div className="comments-section">
                            {story.comentarios && story.comentarios.map((c, idx) => (
                                <div key={idx} className="comment">
                                    {/* Ajustado para mostrar autor do comentário */}
                                    <strong>{c.user?.nome || 'Usuário'}: </strong>
                                    <span>{c.texto}</span>
                                </div>
                            ))}
                            <div className="comment-input-group">
                                <input
                                    type="text"
                                    placeholder="Escreva um comentário..."
                                    value={commentText[story.id] || ''}
                                    onChange={(e) => setCommentText({ ...commentText, [story.id]: e.target.value })}
                                />
                                <button onClick={() => onCommentSubmit(story.id)}>Enviar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoriesScreen;