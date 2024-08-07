import styles from './info.module.css'
import { useEffect, useState } from 'react';
import { writeData } from "@/util/firebase/DBOperations";


// the Info component displays the balance, commission, net worth, reset button, position, market value
export default function Info({balance, commission, position, user}) {
    const [marketValue, setMarketValue] = useState(null);

    // find market value
    useEffect(() => {
        if(!position) {
            setMarketValue(0);
        }

        const URL = `${process.env.NEXT_PUBLIC_PY_SERVER_URL}request/get_market_value`;
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...position}),
        }).then(response => {
            if (!response.ok) {
                return response.json().then(errorMsg => {
                    throw new Error(errorMsg);
                });
            }
            return response.json();
        }).then(data => {
            setMarketValue(Number(data));
        }).catch(error => {
            alert(error.message);
        });
    }, [position]);

    // handler
    // handles the reset request
    const handleReset = async () => {
        await writeData("users/" + user.uid + "/balance", null);
        await writeData("users/" + user.uid + "/position", null);
        await writeData("users/" + user.uid + "/watchlist", null);
        window.location.reload();
    }



    // render the Info component
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

            <div className= {`${styles.net_worth}, ${styles.two_rows}`}>
                <div className= {styles.label}>Net Worth: (USD)</div>
                <div className= {styles.value}>
                    {marketValue === null ? "Loading ..." : "$" + (marketValue + balance).toFixed(2)}
                </div>
            </div>

            <div className= {`${styles.reset}`}>
                <button className={styles.button} onClick={handleReset}>Reset</button>
            </div>

            <div className= {`${styles.position}`}>
                <div>Position:</div>
                <div>{setUpPosition(position)}</div>
            </div>

            <div className= {`${styles.market_value}, ${styles.two_rows}`}>
                <div className= {styles.label}>Market Value:</div>
                <div className= {styles.value}>{marketValue === null ? "Loading ..." : "$" + marketValue}</div>
            </div>
        </div>
    );
}

function setUpPosition(position) {
    if(!position) {
        return;
    }

    let positionEntries = [];

    // sort the positions based on the shares (high to low)
    const sort_func = (a, b) => b[1] - a[1];
    const entries = Object.entries(position).sort(sort_func);

    for(const [ticker, shares] of entries) {
        if(shares === 0) {
            continue;
        }
        
        positionEntries.push(
            <div className={styles.position_entry}>
                <div>Ticker: {ticker}</div> 
                <div>Shares: {shares}</div>
            </div>
        );
    }

    return positionEntries;
}
