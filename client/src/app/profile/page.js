"use client"
import { useContext } from "react";
import { AuthContext } from "@/util/AuthContext";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import LoadingPage from "@/components/LoadingPage";

export default function Profile() {
    const [user, userinfo, loading, setLoading] = useContext(AuthContext);

    // ensure that the user has been loaded
    const page = loading ? <LoadingPage /> :
        (
            <main className="main">
                <div className="navbar"><Navbar> </Navbar></div>
                <div className={`main_panel ${styles.container}`}>
                    <div className={styles.grid}>
                        Name:
                    </div>
                    <div className={styles.grid}>

                    </div>

                    <div className={styles.grid}>
                        Email:
                    </div>
                    <div className={styles.grid}>
                        {user.email}
                    </div>

                    <div className={styles.grid}>
                        Password:
                    </div>
                    <div className={styles.grid}>

                    </div>

                    <div className={styles.grid}>
                        Email Verified:
                    </div>
                    <div className={styles.grid}>
                        {user.emailVerified ? "Verified" : "Not Verified"}
                    </div>

                    <div className={styles.grid}>
                        Delete Account:
                    </div>
                    <div className={styles.grid}>

                    </div>
                </div>
            </main>

        );

    return page;
}