import axios from 'axios';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

function CheckoutRouter() {
    const location = useLocation();
    const history = useHistory();
    const orderId = new URLSearchParams(location.search).get('OrderId');

    useEffect(() => {
        axios.get(`/orders/${orderId}`).then(({ data: order }) => {
            if (order.type === 'course') {
                history.push({ pathname: '/course' });
            } else if (order.type === 'tournament') {
                history.push({ pathname: '/tournament' });
            } else {
                history.push({ pathname: '/coaching' });
            }
        });
    }, []);

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <Spinner
                variant='light'
                animation='border'
            />
        </div>
    );
}

export default CheckoutRouter;
