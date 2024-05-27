"use client"
import Navbar from "@/components/Navbar"
import styles from "./page.module.css"
import { useContext, useRef, useState } from "react";
import { AuthContext } from "@/util/AuthContext";
import LoadingPage from "@/components/LoadingPage";

export default function Trade() {

    const [user, userinfo, loading, setLoading] = useContext(AuthContext);

    const [balance, setBalance] = useState(null);
    const [commission, setCommission] = useState(null);
    const ticker = useRef("");
    const [tickerInfo, setTickerInfo] = useState(null);

    // initialize user data
    useState(() => {
        if (!loading) {
            setBalance(userinfo.balance);
            setCommission(userinfo.commission);
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
            console.log(res)
        } catch (error) {
            return alert(error.message);
        }
    }

    // ensure that the user has been loaded
    const page = loading ? <LoadingPage /> :
        (
            <main className="main" >
                <div className="navbar"><Navbar> </Navbar></div>

                <div className={`main_panel ${styles.container}`}>

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


                    <div className={`${styles.watchlist} ${styles.grid_item}`}>
                        <div className={styles.title}>Watchlist</div>
                        <div>Symbol</div>
                        <div>Last</div>
                        <div>Now</div>
                        <div>Chg%</div>
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
                            <button>Watchlist</button>
                        </div>

                    </div>


                    <div className={`${styles.trade} ${styles.grid_item}`}>
                        <div className={styles.title}>Trade</div>


                        <div className={`${styles.display} ${styles.grid_item}`}>
                            <div>Symbol</div>
                            <div>Last</div>
                            <div>Now</div>
                            <div>Chg%</div>

                            <div>{tickerInfo ? tickerInfo.ticker : ""}</div>
                            <div>{tickerInfo ? tickerInfo.previousClose : ""}</div>
                            <div>{tickerInfo ? tickerInfo.currentPrice : ""}</div>
                            <div>{tickerInfo ? tickerInfo.percentageChange : ""}</div>
                        </div>

                        <div>Buy</div>
                        <div>Sell</div>
                    </div>


                </div>
            </main>
        )

    return page;
}