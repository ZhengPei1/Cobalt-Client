import styles from './entry.module.css'

// entry component used in watchlist and trade, represents a single stock
// use green and red to indicate stock price increase or decrease
export default function Entry({ stockInfo }){
    if (!stockInfo) {
        return <></>;
    }
    
    const color = stockInfo.percentageChange[0] === '-' ? "var(--red)" : "var(--green)";

    return (
        <div className = {styles.container} style={{ backgroundColor: color }}>
            <div>{stockInfo ? stockInfo.ticker : ""}</div>
            <div>{stockInfo ? stockInfo.previousClose : ""}</div>
            <div>{stockInfo ? stockInfo.currentPrice : ""}</div>
            <div>{stockInfo ? stockInfo.percentageChange : ""}</div>
        </div>
    )
};

