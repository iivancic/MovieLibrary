import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:55385/'
});

export default instance;