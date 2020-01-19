import appSettings from '../appSettings';

const api = {
    imageRoute: imageRoute
};

export default api;

const baseRoute = appSettings.baseURL + 'api/FileData/getImage/';

function imageRoute(id) {
    return (baseRoute + id)
}
