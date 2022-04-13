import ApiHandler, {SERVER_URL} from "./util/service-util";

const userApi = new ApiHandler(`${SERVER_URL}`);

const login = async (email, password) => userApi.post('authenticate', {username: email, password});

const signup = async (user) => userApi.post('register', user);



const api = {
    login,
    signup,
}

export default api;
