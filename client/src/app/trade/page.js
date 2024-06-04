"use client"
import Navbar from "@/components/Navbar"
import styles from "./page.module.css"
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/util/firebase/AuthContext";
import LoadingPage from "@/components/LoadingPage";
import { writeData } from "@/util/firebase/DBOperations";

export default function Trade() {

    const [user, userinfo, loading, setLoading] = useContext(AuthContext);

    const [balance, setBalance] = useState(null);
    const [commission, setCommission] = useState(null);
    const [tickerInfo, setTickerInfo] = useState(null);
    const [watchlistReact, setWatchlistReact] = useState([]);
    const watchlist = useRef({});
    const ticker = useRef("");

    // initialize user data
    useEffect(() => {
        if (!loading) {
            setBalance(userinfo.balance);
            setCommission(userinfo.commission);

            // initialize watchlist
            watchlist.current = userinfo.watchlist;

            let URL = `${process.env.NEXT_PUBLIC_PY_SERVER_URL}request/multiple_ticker_info`;
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(watchlist.current),
            }).then(response => {
                return response.json();
            }).then(response => {
                let watchlistEntries = [];
                // extract tickerInfo from response
                for (const tkInfo in response) {
                    watchlistEntries.push(<Entry tickerInfo={response[tkInfo]}></Entry>);
                }
                setWatchlistReact(watchlistEntries);
            }).catch(error => {
                alert(error.message);
            });
        }
    }, [loading])

    // handle the search feature
    const handleSearch = async (e) => {

        let URL = `${process.env.NEXT_PUBLIC_PY_SERVER_URL}request/ticker_info`;
        try {
            let response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "ticker": ticker.current }),
            });

            let res;

            // detect if the ticker is valid
            if (!response.ok) {
                res = null;
            } else {
                res = await response.json();
            }

            setTickerInfo(res);
        } catch (error) {
            return alert(error.message);
        }
    }

    // add entry to Watchlist
    const handleAddWatchlist = async () => {
        if (!tickerInfo) {
            alert("You must search for a ticker first");
            return;
        }

        if (tickerInfo.ticker in watchlist.current) {
            alert("The ticker is already in your watch list");
            return;
        }

        // update watchlist
        let tk = tickerInfo.ticker;
        watchlist.current[tk] = true;

        // update page
        setWatchlistReact([
            ...watchlistReact,
            <Entry tickerInfo={tickerInfo}></Entry>
        ])

        // update database
        await writeData("users/" + user.uid + "/watchlist", watchlist.current);
    }




    // ensure that the user has been loaded
    const page = loading ? <LoadingPage /> :
        (
            <main className="main" >
                <div className="navbar"><Navbar> </Navbar></div>

                <div className={`main_panel ${styles.container}`}>

                    {/* Info Section */}
                    <div className={`${styles.info} ${styles.grid_item}`}>
                        <div style={{ gridArea: "balance" }}>Balance (USD)</div>
                        <div className={styles.value_display} style={{ gridArea: "balance-info" }}>
                            ${balance}
                        </div>


                        <button style={{ gridArea: "reset" }}>Reset</button>

                        <div style={{ gridArea: "equity" }}>Equity</div>
                        <div className={styles.value_display} style={{ gridArea: "equity-info" }}>

                        </div>

                        <div style={{ gridArea: "commission" }}>Commission</div>
                        <div className={styles.value_display} style={{ gridArea: "commission-info" }}>
                            ${commission}
                        </div>
                    </div>

                    {/* Watchlist */}
                    <div className={`${styles.watchlist} ${styles.grid_item}`}>
                        <div className={styles.title}>Watchlist</div>
                        <div>Symbol</div>
                        <div>Last</div>
                        <div>Now</div>
                        <div>Chg%</div>
                        {watchlistReact}
                    </div>

                    <div className={`${styles.history} ${styles.grid_item}`}>
                        <div className={styles.title}>Trading History</div>

                    </div>


                    {/* Search Section */}
                    <div className={`${styles.search} ${styles.grid_item}`}>
                        <div className={styles.title}>Search</div>

                        {/*Ticker search box*/}
                        <label htmlFor="ticker" className={styles.label}>Ticker:</label>
                        <input type="text"
                            name="ticker"
                            className={styles.value_input}
                            placeholder="input a valid ticker here"
                            onChange={e => { ticker.current = e.target.value }}></input>

                        <button className={styles.search_button} onClick={handleSearch}>Search</button>


                        <div className={styles.result}>
                            <div>Name: {tickerInfo ? tickerInfo.name : ""} {tickerInfo ? "(" + tickerInfo.ticker + ")" : ""}</div>
                            <div>Type: {tickerInfo ? tickerInfo.type : ""}</div>
                            <button onClick={handleAddWatchlist}>Add To Watchlist</button>
                        </div>

                    </div>

                    {/* Trade Section */}
                    <div className={`${styles.trade} ${styles.grid_item}`}>
                        <div className={styles.title}>Trade</div>

                        <div className={`${styles.display} ${styles.grid_item}`}>
                            <div>Symbol</div>
                            <div>Last</div>
                            <div>Now</div>
                            <div>Chg%</div>

                            <Entry tickerInfo={tickerInfo}></Entry>
                        </div>

                        <div>Buy</div>
                        <div>Sell</div>
                    </div>


                </div>
            </main>
        )

    return page;
}

// entry component used in watchlist and trade
const Entry = (props) => {
    let tickerInfo = props.tickerInfo;

    if (!tickerInfo) {
        return <></>;
    }

    // use green and red to indicate stock price increase or decrease
    const color = tickerInfo.percentageChange[0] === '-' ? "var(--red)" : "var(--green)";

    return (
        <div className={styles.entry}
            style={{ backgroundColor: color }}>
            <div>{tickerInfo ? tickerInfo.ticker : ""}</div>
            <div>{tickerInfo ? tickerInfo.previousClose : ""}</div>
            <div>{tickerInfo ? tickerInfo.currentPrice : ""}</div>
            <div>{tickerInfo ? tickerInfo.percentageChange : ""}</div>
        </div>
    )
}