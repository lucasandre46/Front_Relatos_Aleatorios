export const loginUser = async (credentials) => {
    try {
        const response = await fetch('https://api-relatos-aleatorios-vdzb.vercel.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        return { success: response.ok, ...data };
    } catch (error) {
        console.error('Erro de conexão:', error);
        return { success: false, error: error.message };
    }
};
