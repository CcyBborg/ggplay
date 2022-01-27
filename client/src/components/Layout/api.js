import axios from 'axios';

export function fetchUserInfo() {
    return axios.get('/users/info', {
        withCredentials: true
    });
}
