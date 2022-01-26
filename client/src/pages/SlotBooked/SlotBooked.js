import { Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function SlotBooked() {
    const location = useLocation();

    
    alert(new URLSearchParams(location.search).get('OrderId'));

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <Spinner
                variant='light'
                animation='border'
            />
        </div>
    );
}

export default SlotBooked;
