import {sessionService} from "redux-react-session";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default class ApiHandler {
    baseUrl;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
        return this;
    }

    handleFetch = async (input, init) => {
        let user;
        try {
            user = await sessionService.loadSession();
        } catch (err) {
            // Do nothing - let server decide if the fetch should be session based
        }
        if (user) {
            init.headers = {...init.headers, 'Authorization': "Bearer " + user.token};
        }
        let data = '';

        try {
            const response = await fetch(input, init);
            
            if (response.ok) {
                data = await response.json()
                return Promise.resolve(data)
            }
            if (response.status === 401) {
                await sessionService.deleteSession();
                await sessionService.deleteUser();
            }
            return Promise.reject(response.statusText ? response.statusText : data.errorMessage)
        } catch (err) {
            return Promise.reject(err.message ? err.message : data)
        }
    }

    post = async (route, body) => {
        return this.handleFetch(`${this.baseUrl}/${route}`, {
            method: "POST", body: JSON.stringify(body),
            headers: {'content-type': 'application/json'}
        });
    }

    put = async (route, entity) => {
        return this.handleFetch(`${this.baseUrl}/${route}`, {
            method: "PUT", body: JSON.stringify(entity),
            headers: {'content-type': 'application/json'}
        });
    }

    remove = async (route) => {
        return this.handleFetch(`${this.baseUrl}/${route}`, {method: "DELETE"});
    }

    fetchAll = async (route) => {
        return this.handleFetch(`${this.baseUrl}/${route}`, {
            method: "GET",
        });
    }

    fetchById = async (route) => {
        const singularFetchUrl = this.baseUrl.substr(0, this.baseUrl.length - 1);
        return this.handleFetch(`${singularFetchUrl}/${route}`, {method: "GET"});
    }
}
