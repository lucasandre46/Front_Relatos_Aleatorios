import React, { useState, useEffect } from 'react';
import './storiesCss.css';
import { fetchStories, getComments } from './storiesFetch';
import { handleCreatePost, handleInteraction } from './storiesFunctions';

const StoriesScreen = () => {
    const [stories, setStories] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('Aleatório');
    const [commentText, setCommentText] = useState({});
    const [visibleComments, setVisibleComments] = useState({});

    const themes = ['Terror', 'Comédia', 'Drama', 'Romance', 'Sci-Fi', 'Aleatório'];

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        const data = await fetchStories();
        if (Array.isArray(data)) setStories(data);
    };

    const onPostSubmit = async () => {
        if (!newPost) return alert('Escreva algo!');
        await handleCreatePost(newPost, selectedTheme, setStories);
        setNewPost('');
    };

    const loadPostComments = async (id) => {
        try {
            const comments = await getComments(id);
            setStories(prevStories => prevStories.map(story => {
                if (story.id === id) {
                    return { ...story, comentarios: comments };
                }
                return story;
            }));
        } catch (e) {
            console.error("Erro ao carregar comentários", e);
        }
    };

    const toggleComments = (id) => {
        setVisibleComments(prev => {
            const isVisible = !!prev[id];
            if (!isVisible) {
                loadPostComments(id);
            }
            return { ...prev, [id]: !isVisible };
        });
    };

    const onCommentSubmit = async (id) => {
        const text = commentText[id];
        if (!text) return alert("Escreva um comentário!");

        const result = await handleInteraction('comment', id, { texto: text });

        if (result) {
            setCommentText({ ...commentText, [id]: '' });
            loadPostComments(id);
            loadStories();
        }
    };

    const handleLike = async (story) => {
        const result = await handleInteraction('like', story.id);
        if (result) {
            loadStories();
        }
    };

    const isUserLiked = (story) => {
        const userId = localStorage.getItem('userId');
        if (!userId) return false;
        return story.curtidas && story.curtidas.some(like => String(like.id_User) === String(userId));
    };

    // O RETURN DEVE ESTAR SEMPRE DENTRO DA FUNÇÃO StoriesScreen
    return (
        <div className="stories-container">
            {/* Box de Criação de Relato */}
            <div className="create-post-box">
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
                    placeholder="O que está acontecendo agora?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <button className="publish-btn" onClick={onPostSubmit}>Publicar Relato</button>
            </div>

            {/* Feed de Histórias */}
            <div className="feed">
                {stories.map(story => (
                    <div key={story.id} className="story-card">
                        <div className="story-header">
                            <span className="story-theme">#{story.tema}</span>
                            <span className="story-author">Por <strong>{story.user?.nome || 'Anônimo'}</strong></span>
                        </div>
                        <p className="story-content">{story.texto}</p>

                        <div className="story-actions">
                            <button
                                className={`action-btn ${isUserLiked(story) ? 'liked' : ''}`}
                                onClick={() => handleLike(story)}
                            >
                                {isUserLiked(story) ? '💙' : '🤍'} {story._count?.curtidas || 0}
                            </button>

                            <button className="action-btn" onClick={() => toggleComments(story.id)}>
                                💬 {story._count?.comentarios || 0}
                            </button>
                        </div>

                        {visibleComments[story.id] && (
                            <div className="comments-section">
                                {story.comentarios && story.comentarios.length > 0 ? (
                                    story.comentarios.map((c, idx) => (
                                        <div key={idx} className="comment">
                                            <strong>{c.user?.nome || 'Anônimo'}</strong>
                                            <span>{c.texto}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Seja o primeiro a comentar...</p>
                                )}

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
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoriesScreen;