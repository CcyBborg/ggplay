import { Image } from 'react-bootstrap';
import downIcon from './down.svg';
import upIcon from './up.svg';

function Arrow(variant, size=32) {
    return (
        <Image
            src={variant === 'up' ? upIcon : downIcon}
            width={size}
            height={size}
            alt='Arrow icon' />
    );
}

export default Arrow;
