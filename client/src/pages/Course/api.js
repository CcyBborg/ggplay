import axios from 'axios';

export function fetchComments(lessonId) {
    return axios.get(`/comments/${lessonId}`);
}

export function addComment({ lessonId, comment }) {
    return axios.post(`/comments/${lessonId}`, {
        comment
    });
}
