import { Image, Button } from 'react-bootstrap';
import vkIcon from './images/vk.svg';
import googleIcon from './images/google.svg'
import yandexIcon from './images/yandex.svg';
import discordIcon from './images/discord.svg';
import styles from './oauth.module.css';

function Oauth() {
    return (
        <ul className={styles.root}>
            <li>
                <Button
                    className={styles.button}
                    variant='secondary'
                    onClick={() => oauth('vkontakte')}>
                    <Image src={vkIcon} width='28' height='28' />
                </Button>
            </li>
            <li>
                <Button
                    className={styles.button}
                    variant='secondary'
                    onClick={() => oauth('google')}>
                    <Image src={googleIcon} width='28' height='28' />
                </Button>
            </li>
            <li>
                <Button
                    className={styles.button}
                    variant='secondary'
                    onClick={() => oauth('yandex')}>
                    <Image src={yandexIcon} width='28' height='28' />
                </Button>
            </li>
            <li>
                <Button
                    className={styles.button}
                    variant='secondary'
                    onClick={() => oauth('discord')}>
                    <Image src={discordIcon} width='28' height='28' />
                </Button>
            </li>
        </ul>
    );
}

function oauth(name) {
    if (process?.env?.NODE_ENV === 'development') {
        window.open(`http://localhost:5000/users/auth/${name}`, '_self');
    } else {
        window.open(`/users/auth/${name}`, '_self');
    }
}

export default Oauth;
