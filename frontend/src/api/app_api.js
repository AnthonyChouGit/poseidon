import axios from 'axios';

const base_url = 'http://nozomu-ac.top:90';

const app_api = axios.create({
    baseURL: base_url,
    timeout: 5000,
});

const fetch_all_apps = () => app_api.get('/api/apps');

const fetch_app_by_id = (app_id) => app_api.post('/api/app', { app_id });

export { fetch_all_apps, fetch_app_by_id };
