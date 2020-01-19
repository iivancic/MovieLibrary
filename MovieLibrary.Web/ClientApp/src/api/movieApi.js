import baseApi from './baseApi';

const api = {
    getList: getList,
    deleteEntity: deleteEntity,
    addEntity: addEntity,
    changeEntity: changeEntity,
    getById: getById
};

export default api;

const baseRoute = 'api/Movies/';
const basePostRoute = 'api/Movies';


function getList(params) {
    return baseApi.get(baseRoute, { params: params });
}

function getById(id) {
    return baseApi.get(baseRoute+id)
}

function deleteEntity(id) {
    return baseApi.delete(baseRoute + id);
}

function addEntity(data) {
    return baseApi.post(basePostRoute, data)
}

function changeEntity(id, data) {
    return baseApi.put(baseRoute + id, data);
}
