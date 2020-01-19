import baseApi from './baseApi';

const api = {
    getList: getList,
    deleteEntity: deleteEntity,
    addEntity: addEntity,
    changeEntity: changeEntity
};

export default api;

const baseRoute = 'api/FileInfo/';

function getList(params) {
    return baseApi.get(baseRoute, { params: params });
}

function deleteEntity(id) {
    return baseApi.delete(baseRoute + id);
}

function addEntity(data) {
    return baseApi.post(baseRoute, data);
}

function changeEntity(id, data) {
    return baseApi.put(baseRoute + id, data);
}