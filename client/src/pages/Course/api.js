import axios from 'axios';

export function fetchComments(lessonId) {
    return axios.get(`/comments/${lessonId}`);
}
