import axios from 'axios';

// KEY API: bb733893375ffd0a362d0d23c5dfc8fd
// BASE URL: https://api.themoviedb.org/3/

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;