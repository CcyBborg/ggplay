import axios from 'axios';

export function signInUser({
    email,
    password,
}) {
    return axios.post('/users/sign-in', {
        email,
        password
    });
}