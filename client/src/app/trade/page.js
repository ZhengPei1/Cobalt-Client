"use client"
import Navbar from "@/components/Navbar"
import styles from "./page.module.css"
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/util/firebase/AuthContext";
import LoadingPage from "@/components/LoadingPage";
import Info from "./Info";
import Watchlist from "./Watchlist";
import Search from "./Search";
import Transaction from "./Transaction";

export default function Trade() {

    const [user, userinfo, loading, setLoading] = useContext(AuthContext);
    const [balance, setBalance] = useState(null);
    const [commission, setCommission] = useState(null);
    const [position, setPosition] = useState(null);
    const [watchlistStocks, setWatchlistStocks] = useState([]);
    const [currentStock, setCurrentStock] = useState(null);

    // initialize user data
    useEffect(() => {
        if (!loading) {
            setBalance(Number(userinfo.balance));
            setCommission(Number(userinfo.commission));
            setPosition(userinfo.position);

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
                    return response.json().then(errorMsg =>{
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
                        <Info balance={balance} commission={commission} position={position}></Info>
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

                    {/* Transaction Section */}
                    <div className={`${styles.transaction} ${styles.grid_item}`}>
                        <Transaction
                            user={user}
                            currentStock={currentStock}
                            balance={balance}
                            setBalance={setBalance}
                            commission={commission}
                            position={position}
                            setPosition={setPosition}
                        ></Transaction>
                    </div>
                </div>
            </main>
        )

    return page;
}
