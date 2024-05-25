"use client"
import Navbar from "@/components/Navbar"
import styles from "./page.module.css"

export default function Trade() {
    return (
        <main className="main" >
            <div className="navbar"><Navbar> </Navbar></div>
            <div className={`main_panel ${styles.container}`}>

                <div className={styles.info}>
                    <div>Account Balance (USD)</div>
                    <button>Reset</button>
                    <div>Equity</div>
                    <div>Commission</div>
                </div>


                <div className={styles.watchlist}>
                    <div className={styles.title}>Watchlist</div>
                    <div>Symbol</div>
                    <div>Last</div>
                    <div>Chg</div>
                    <div>Chg%</div>
                    <div>Exit Pt</div>
                </div>

                <div className={styles.trending}>
                    <div className={styles.title}>Trending</div>
                </div>

                <div className={styles.trade}>
                    <div>Symbol</div>
                    <div>Last</div>
                    <div>Chg</div>
                    <div>Chg%</div>
                    <div>Exit Pt</div>
                    <div>Purchase</div>
                    <div>Sell</div>
                </div>


            </div>
        </main>
    )
}