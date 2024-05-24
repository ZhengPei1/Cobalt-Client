"use client"
import StockPan from "./StockPan"
import Navbar from "@/components/Navbar"
import styles from "./page.module.css"
import config from "@/static/config.json"

export default function Home() {
    const values = config.values;

    return (
        <main className="main">
            <div className="navbar"><Navbar> </Navbar></div>

            <div className={`main_panel ${styles.container}`}>
                <StockPan
                    ticker={values[0].ticker}
                    start={values[0].start}
                    end={values[0].end}
                    interval={values[0].interval}>
                </StockPan>
                <StockPan
                    ticker={values[1].ticker}
                    start={values[1].start}
                    end={values[1].end}
                    interval={values[1].interval}>
                </StockPan>
            </div>
        </main>
    )
}
