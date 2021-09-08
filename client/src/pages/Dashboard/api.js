import axios from 'axios';

export function fetchSlots() {
    return axios.get('/users/slots', {
        withCredentials: true
    });
}
