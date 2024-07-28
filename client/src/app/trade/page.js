"use client"
import Navbar from "@/components/Navbar"
import styles from "./page.module.css"
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/util/firebase/AuthContext";
import LoadingPage from "@/components/LoadingPage";
import Info from "./Info";
import Watchlist from "./Watchlist";
import Search from "./Search";

export default function Trade() {

    const [user, userinfo, loading, setLoading] = useContext(AuthContext);
    const [balance, setBalance] = useState(null);
    const [commission, setCommission] = useState(null);
    const [watchlistStocks, setWatchlistStocks] = useState([]);
    const [currentStock, setCurrentStock] = useState(null);

    // initialize user data
    useEffect(() => {
        if (!loading) {
            setBalance(userinfo.balance);
            setCommission(userinfo.commission);

            // initialize watchlist
            let URL = `${process.env.NEXT_PUBLIC_PY_SERVER_URL}request/multiple_ticker_info`;
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"ticker": userinfo.watchlist}),
            }).then(response => {
                if (!response.ok) {
                    return response.json.then(errorMsg =>{
                        throw new Error(errorMsg);
                    })
                }
                return response.json();
            }).then(response => {
                setWatchlistStocks(response);
            }).catch(error => {
                alert(error.message);
            });
        }
    }, [loading])
    

    // ensure that the user has been loaded
    const page = loading ? <LoadingPage /> :
        (
            <main className="main" >
                <div className="navbar"><Navbar> </Navbar></div>

                <div className={`main_panel ${styles.container}`}>

                    {/* Info Section */}
                    <div className={`${styles.info} ${styles.grid_item}`}>
                        <Info balance={balance} commission={commission}></Info>
                    </div>

                    {/* Watchlist */}
                    <div className={`${styles.watchlist} ${styles.grid_item}`}>
                        <Watchlist watchlistStocks={watchlistStocks}></Watchlist>
                    </div>

                    {/* Search Section */}
                    <div className={`${styles.search} ${styles.grid_item}`}>
                        <Search 
                            currentStock={currentStock} 
                            setCurrentStock={setCurrentStock}
                            watchlistStocks={watchlistStocks} 
                            setWatchlistStocks={setWatchlistStocks}
                            user = {user}></Search>
                    </div>

                    {/* 
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
                    Trade Section */}
                </div>
            </main>
        )

    return page;
}
