import styles from './search.module.css'
import { useState } from "react";
import { writeData } from "@/util/firebase/DBOperations";


// the search feature (Including add to watchlist feature)
export default function Search({currentStock, setCurrentStock, watchlistStocks, setWatchlistStocks, user}) {
    const [userInput, setUserInput] = useState(null);

    // handlers
    // handle the search feature
    const handleSearch = async (e) => {
        let URL = `${process.env.NEXT_PUBLIC_PY_SERVER_URL}request/ticker_info`;
        try {
            let response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"ticker": userInput}),
            });

            const res = await response.json();

            // detect if the ticker is valid
            if (!response.ok) {
                setCurrentStock(null);
                throw new Error(res);
            }

            setCurrentStock(res);
        } catch (error) {
            return alert(error.message);
        }
    }

    // handle the watchlist feature
    const handleAddWatchlist = async () => {
        if (!currentStock) {
            alert("You must search for a valid ticker first");
            return;
        }
        
        // check if the ticker is already in watchlist
        if (currentStock.ticker in watchlistStocks) {
            alert("The stock is already in your watch list");
            return;
        }

        // if not, add the ticker to watchlist
        const newWatchlist = { ...watchlistStocks, [currentStock.ticker]: currentStock }
        setWatchlistStocks(newWatchlist);

        let tickers = Object.keys(newWatchlist);
        // update database
        await writeData("users/" + user.uid + "/watchlist", tickers);
    }

    // render the search section
    return (
        <div className={styles.container}>
            <div className={styles.title}>Search</div>
            
            {/* ticker input */}
            <label htmlFor="ticker" className={styles.label}>Ticker:</label>
            <input  type="text"
                    name="ticker"
                    className={styles.search_box}
                    placeholder="input a valid ticker here"
                    value = {userInput}
                    onChange={e => { setUserInput(e.target.value) }}></input>

            {/* search button */}
            <button className={styles.search} onClick={handleSearch}>Search</button>
            
            {/* watchlist button */}
            <button className={styles.watchlist} onClick={handleAddWatchlist}>Watchlist</button>

            {/* search result display */}
            <div className={styles.result}>
                <div>Name: {currentStock ? currentStock.name : ""} {currentStock ? "(" + currentStock.ticker + ")" : ""}</div>
                <div>Type: {currentStock ? currentStock.type : ""}</div>
            </div>

        </div>
    );

}