import axios from 'axios';

export function fetchGames() {
    return axios.get('/games');
}

export function fetchCoaches({
    game
}) {
    return axios.get('/coaches', { params: {
        game
    }});
}
