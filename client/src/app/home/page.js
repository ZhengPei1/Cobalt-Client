"use client"
import StockPan from "./StockPan"
import Navbar from "@/components/Navbar"
import styles from "./page.module.css"
import { useContext } from "react"
import { AuthContext } from "@/util/AuthContext"
import LoadingPage from "@/components/LoadingPage"

export default function Home() {
    const [user, userinfo, loading, setLoading] = useContext(AuthContext);

    // ensure that the user has been loaded
    const page = loading ? <LoadingPage /> :
        (
            <main className="main">
                <div className="navbar"><Navbar> </Navbar></div>

                <div className={`main_panel ${styles.container}`}> {/*Initialize user data*/}
                    <StockPan
                        ticker={userinfo.panel1.ticker}
                        start={userinfo.panel1.start_date}
                        end={userinfo.panel1.end_date}
                        interval={userinfo.panel1.interval}
                        panel_id="panel1">
                    </StockPan>
                    <StockPan
                        ticker={userinfo.panel2.ticker}
                        start={userinfo.panel2.start_date}
                        end={userinfo.panel2.end_date}
                        interval={userinfo.panel2.interval}
                        panel_id="panel2">
                    </StockPan>
                </div>
            </main>
        )


    return page;
}
