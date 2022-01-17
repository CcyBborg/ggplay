import RegisterModal from '../RegisterModal/RegisterModal';
import { Form } from 'react-bootstrap';

function CSRegister({
    isShow,
    onHide
}) {
    return (
        <RegisterModal
            title='Турнир CS:GO 2021'
            subtitle='16 ДЕК — НАЧАЛО В 18:00'
            isShow={isShow}
            onHide={onHide}>
            <Form.Group>
                <Form.Label>Теущее звание</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Звание или уровень Faceit' />
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>Укажи ссылку на свой Faceit</Form.Label>
                <Form.Control
                        type='url'
                        placeholder='Ссылка на Faceit' />
            </Form.Group>
        </RegisterModal>
    );
}

export default CSRegister;
