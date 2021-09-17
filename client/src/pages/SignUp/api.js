import axios from 'axios';

export function fetchGames() {
    return axios.get('/games');
}

export function fetchRanks(gameId) {
    return axios.get(`/games/${gameId}/ranks`);
}

export function createUser({
    nickname,
    email,
    password,
    game,
    rank
}) {
    return axios.post('/users', {
        nickname,
        email,
        password,
        game,
        rank
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

export function editUser({
    game,
    rank
}) {
    return axios.post('/users/edit', {
        game,
        rank
    });
}

