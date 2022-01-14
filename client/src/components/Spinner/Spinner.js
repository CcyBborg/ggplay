import styles from './spinner.module.css';

function Spinner() {
    return (
        <div className={styles['lds-dual-ring']}></div>
    );
}

export default Spinner;
