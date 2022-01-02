import axios from 'axios';

export function logout() {
    return axios.get('/users/logout', {
        withCredentials: true
    });
}
