import api from './client';

const fetch_all_apps = () => api.get('/api/apps');

const fetch_app_by_id = (app_id) => api.post('/api/app', { app_id });

export { fetch_all_apps, fetch_app_by_id };
