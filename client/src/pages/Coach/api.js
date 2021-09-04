import axios from 'axios';

export function fetchCoach(id) {
    return axios.get(`/coaches/${id}`);
}

export function bookSlot(slotId) {
    return axios.post('/users/book-slot', {
        slotId
    });
}
