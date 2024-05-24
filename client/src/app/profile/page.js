"use client"
import { useContext } from "react";
import { AuthContext } from "@/util/AuthContext";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";

export default function Profile() {
    const [user, loading] = useContext(AuthContext);

    const render = loading ? <h1 style={{"textAlign" : "center"}}>Loading User Info ...</h1> :
        (
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
        );

    return (
        <main className="main">
            <div className="navbar"><Navbar> </Navbar></div>
            {render}
        </main>
    )
}