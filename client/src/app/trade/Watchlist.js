import styles from './watchlist.module.css'
import Entry from './Entry';

// generate watchlist based on the response from the server (get_multiple_ticker_info)
export default function Watchlist({watchlistStocks}) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Watchlist</div>

            <div className={styles.section_titles}>
                <div>Symbol</div>
                <div>Last</div>
                <div>Now</div>
                <div>Chg%</div>
            </div>

            <div className={styles.watchlist}>
                {setUpWatchlist(watchlistStocks)}
            </div>            
        </div>
    );
}

function setUpWatchlist(stockInfos) {
    let watchlistEntries = [];

    // sort the stocks using the ticker
    let sortedStocks = Object.entries(stockInfos).sort();
    for (const [, info] of sortedStocks) {
        watchlistEntries.push(<Entry stockInfo={info}></Entry>);
    }
    return watchlistEntries;
}



