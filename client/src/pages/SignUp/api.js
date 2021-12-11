import axios from 'axios';

export function fetchGames() {
    return axios.get('/games');
}

export function createUser({
    nickname,
    email,
    password,
    game
}) {
    return axios.post('/users', {
        nickname,
        email,
        password,
        game
    });
}

export function signInUser({
    email,
    password
}) {
    return axios.post('/users/sign-in', {
        email,
        password
    });
}

export function editUser(game) {
    return axios.post('/users/edit', {
        game
    });
}

