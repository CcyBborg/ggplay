import { Image, Button } from 'react-bootstrap';
import vkIcon from './images/vk.svg';
import googleIcon from './images/google.svg'
import yandexIcon from './images/yandex.svg';
import discordIcon from './images/discord.svg';
import styles from './oauth.module.css';

function Oauth({ selectedGame }) {
    return (
        <ul className={styles.root}>
            <li>
                <Button
                    className={styles.button}
                    variant='secondary'
                    onClick={() => oauth('vkontakte', selectedGame)}>
                    <Image src={vkIcon} width='28' height='28' />
                </Button>
            </li>
            <li>
                <Button
                    className={styles.button}
                    variant='secondary'
                    onClick={() => oauth('google', selectedGame)}>
                    <Image src={googleIcon} width='28' height='28' />
                </Button>
            </li>
            <li>
                <Button
                    className={styles.button}
                    variant='secondary'
                    onClick={() => oauth('yandex', selectedGame)}>
                    <Image src={yandexIcon} width='28' height='28' />
                </Button>
            </li>
            <li>
                <Button
                    className={styles.button}
                    variant='secondary'
                    onClick={() => oauth('discord', selectedGame)}>
                    <Image src={discordIcon} width='28' height='28' />
                </Button>
            </li>
        </ul>
    );
}

function oauth(name, selectedGame) {
    if (process?.env?.NODE_ENV === 'development') {
        window.open(formOauthURL(
            `http://localhost:5000/users/auth/${name}`,
            selectedGame
        ), '_self');
    } else {
        window.open(formOauthURL(
            `/users/auth/${name}`,
            selectedGame
        ), '_self');
    }
}

function formOauthURL(url, selectedGame) {
    if (selectedGame) {
        return `${url}?game=${selectedGame}`;
    }

    return url;
}

export default Oauth;
