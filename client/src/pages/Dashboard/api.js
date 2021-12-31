import axios from 'axios';

export function fetchSlots() {
    return axios.get('/users/slots', {
        withCredentials: true
    });
}

export function logout() {
    return axios.get('/users/logout', {
        withCredentials: true
    });
}
