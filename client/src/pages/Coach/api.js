import axios from 'axios';

export function fetchCoach(id) {
    return axios.get(`/coaches/${id}`);
}

export function bookSlot(slotId) {
    return axios.post('/slots/book', {
        slotId
    });
}
