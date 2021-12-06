import { Container, Image } from 'react-bootstrap';
import styles from './auth-screen.module.css';

function AuthScreen({ children }) {
    return (
        <div className={styles.root}>
            <Container>
                <a href='/'>
                    <Image src='/images/logo.png' className='mb-5 mt-5' width='160' />
                </a>
                {children}
            </Container>
        </div>
    );
}

export default AuthScreen;
