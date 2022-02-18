import axios from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import TournamentRegister from '../../components/TournamentRegister/TournamentRegister';

function CSRegister() {
    const [rating, setRating] = useState('');
    const [faceit, setFaceit] = useState('');

    return (
        <TournamentRegister
            title='Турнир CS:GO 2022'
            subtitle='4 МАР — НАЧАЛО В 16:00 ПО МСК'
            game='cs'
            onSubmit={params => {
                axios.post('/orders/tournament', {
                    ...params,
                    rating,
                    faceit,
                    tournament: 'cs'
                }).then(({ data }) => {
                    window.open(data.url, '_self');
                });
            }}>
            <Form.Group>
                <Form.Label>Теущее звание</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Звание или уровень Faceit'
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    required />
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>Укажи ссылку на свой Faceit</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Ссылка на Faceit'
                    value={faceit}
                    onChange={e => setFaceit(e.target.value)}
                    required />
            </Form.Group>
        </TournamentRegister>
    );
}

export default CSRegister;
