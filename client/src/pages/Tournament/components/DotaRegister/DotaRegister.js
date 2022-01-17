import RegisterModal from '../RegisterModal/RegisterModal';
import { Form } from 'react-bootstrap';

function DotaRegister({
    isShow,
    onHide
}) {
    return (
        <RegisterModal
            title='Турнир Dota2 2021'
            subtitle='16 ДЕК — НАЧАЛО В 18:00'
            isShow={isShow}
            onHide={onHide}>
            <Form.Group>
                <Form.Label>Теущий рейтинг</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Укажи свой рейтинг' />
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>Выберите 3&nbsp;предпочтительные роли в&nbsp;игре</Form.Label>
                <div className='select-tabs'>
                    <Form.Check
                        inline
                        label='Керри'
                        name='check-1'
                        type='checkbox'
                        id='check-1'
                    />
                    <Form.Check
                        inline
                        label='Мид'
                        name='check-2'
                        type='checkbox'
                        id='check-2'
                    />
                    <Form.Check
                        inline
                        label='Хардлейн'
                        type='checkbox'
                        id='check-3'
                    />
                    <Form.Check
                        inline
                        label='Частичная поддержка'
                        type='checkbox'
                        id='check-4'
                    />
                    <Form.Check
                        inline
                        label='Полная поддержка'
                        type='checkbox'
                        id='check-5'
                    />
                </div>
            </Form.Group>
        </RegisterModal>
    );
}

export default DotaRegister;
