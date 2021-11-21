import styles from './spinner.module.css';

function Spinner() {
    return (
        <div class={styles['lds-dual-ring']}></div>
    );
}

export default Spinner;
