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
    for (const ticker in stockInfos) {
        watchlistEntries.push(<Entry stockInfo={stockInfos[ticker]}></Entry>);
    }
    return watchlistEntries;
}



