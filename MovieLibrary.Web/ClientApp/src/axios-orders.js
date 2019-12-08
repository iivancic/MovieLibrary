import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44392/'
});

export default instance;