import axios from 'axios';
import appSettings from '../appSettings';

const instance = axios.create({
    baseURL: appSettings.baseURL
});

export default instance;