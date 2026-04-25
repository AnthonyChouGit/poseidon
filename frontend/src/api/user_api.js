import api from './client';

const login = (data) => api.post('/api/login', data);

const register = (data) => api.post('/api/register', data);

const verify = () => api.get('/api/verify');

export { login, register, verify };
