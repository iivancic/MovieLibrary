import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:55344/'
});

export default instance;