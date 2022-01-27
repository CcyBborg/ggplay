import { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import RegisterModal from '../RegisterModal/RegisterModal';

function DotaRegister({
    isShow,
    onHide
}) {
    const [rating, setRating] = useState('');
    const [roles, setRoles] = useState({
        'Керри': false,
        'Мид': false,
        'Хардлейн': false,
        'Частичная поддержка': false,
        'Полная поддержка': false
    });

    return (
        <RegisterModal
            title='Турнир Dota2 2021'
            subtitle='16 ДЕК — НАЧАЛО В 18:00'
            isShow={isShow}
            onHide={onHide}
            onSubmit={params => {
                axios.post('/orders/tournament', {
                    ...params,
                    rating,
                    roles: Object.keys(roles).filter(k => roles[k]),
                    tournament: 'dota'
                }).then(({ data }) => {
                    window.open(data.url, '_self');
                });
            }}>
            <Form.Group>
                <Form.Label>Теущий рейтинг</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Укажи свой рейтинг'
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    required />
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>Выберите 3&nbsp;предпочтительные роли в&nbsp;игре</Form.Label>
                <div className='select-tabs'>
                    {Object.keys(roles).map(r => (
                        <Form.Check
                            inline
                            label={r}
                            name={r}
                            type='checkbox'
                            id={r}
                            checked={roles[r]}
                            onChange={e => setRoles({
                                ...roles,
                                [r]: e.target.checked
                            })}
                        />
                    ))}
                </div>
            </Form.Group>
        </RegisterModal>
    );
}

export default DotaRegister;
