import axios from 'axios';

base_url = 'nozomu-ac.top:90';

const login = axios.create({
        baseURL: base_url,
        timeout: 5000,
        url: '/api/login',
        method: 'POST'
});


const register = axios.create({
        baseURL: base_url,
        timeout: 5000,
        url: '/api/register',
        method: 'POST'
});

const verify = axios.create({
        baseURL: base_url,
        timeout: 5000,
        url: '/api/verify',
        method: 'GET'
});

export { login, register, verify };