import axios from 'axios';

export function fetchUserInfo() {
    return axios.get('/users/info', {
        withCredentials: true
    });
}

export function postReview({ slotId, rating, comment }) {
    return axios.post(`/slots/${slotId}/review`, {
        rating,
        comment
    });
}
