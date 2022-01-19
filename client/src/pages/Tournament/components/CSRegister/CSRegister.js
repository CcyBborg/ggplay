import axios from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import RegisterModal from '../RegisterModal/RegisterModal';

function CSRegister({
    isShow,
    onHide
}) {
    const [rating, setRating] = useState('');
    const [faceit, setFaceit] = useState('');

    return (
        <RegisterModal
            title='Турнир CS:GO 2021'
            subtitle='16 ДЕК — НАЧАЛО В 18:00'
            isShow={isShow}
            onHide={onHide}
            onSubmit={params => {
                axios.post('/tournaments/cs', {
                    ...params,
                    rating,
                    faceit
                }).then(() => {
                    window.location.reload();
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
        </RegisterModal>
    );
}

export default CSRegister;