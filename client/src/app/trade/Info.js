import styles from './info.module.css'


// the Info component displays the balance, commission, equity, reset button, position, market value
export default function Info({balance, commission}) {
    return (
        <div className={styles.container}>

            <div className= {`${styles.balance}, ${styles.two_rows}`}>
                <div className= {styles.label}>Balance: (USD)</div>
                <div className= {styles.value}>${balance}</div>
            </div>

            <div className= {`${styles.commission}, ${styles.two_rows}`}>
                <div className= {styles.label}>Commission: (USD)</div>
                <div className= {styles.value}>${commission}</div>
            </div>

            <div className= {`${styles.equity}, ${styles.two_rows}`}>
                <div className= {styles.label}>Equity: (USD)</div>
                <div className= {styles.value}>TODO</div>
            </div>

            <div className= {`${styles.reset}`}>
                <button className={styles.button}>Reset</button>
            </div>

            <div className= {`${styles.position}, ${styles.two_rows}`}>
                <div className= {styles.label}>Position:</div>
                <div className= {styles.value}>TODO</div>
            </div>

            <div className= {`${styles.market_value}, ${styles.two_rows}`}>
                <div className= {styles.label}>Market Value:</div>
                <div className= {styles.value}>TODO</div>
            </div>
        </div>
    );
}


