import axios from 'axios';

export function orderCourse() {
    return axios.post('/orders/course');
}
