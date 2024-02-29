import http from '../common/http-common.js';

const getAll = () => {
    return http.get("/user");
};

const get = id => {
    return http.get(`/user/${id}`);
};

const create = data => {
    return http.post("/user", data);
};

const update = (id, data) => {
    return http.put(`/user/${id}`, data);
}

const remove = id => http.delete(`/user/${id}`);

const UserService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default UserService;