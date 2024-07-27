import styles from './search.module.css'
import { useState } from "react";
import { writeData } from "@/util/firebase/DBOperations";

export default function Search({currentStock, setCurrentStock, watchlistStocks, setWatchlistStocks}) {
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
                body: JSON.stringify({ "ticker": userInput }),
            });

            let res;

            // detect if the ticker is valid
            if (!response.ok) {
                res = null;
            } else {
                res = await response.json();
            }

            setCurrentStock(res);
        } catch (error) {
            return alert(error.message);
        }
    }

    // handle the watchlist feature
    const handleAddWatchlist = async () => {
        if (!userInput) {
            alert("You must search for a ticker first");
            return;
        }
        
        // check if the ticker is already in watchlist
        if (searchResult in watchlistStocks) {
            alert("The ticker is already in your watch list");
            return;
        }

        // if not, add the ticker to watchlist
        setWatchlistStocks([
            ...watchlistStocks,
            searchResult
        ])

        // update database
        await writeData("users/" + user.uid + "/watchlist", watchlistStocks);
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