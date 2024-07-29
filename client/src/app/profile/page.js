"use client"
import { useContext } from "react";
import { AuthContext } from "@/util/firebase/AuthContext";
import { reauthenticateWithGoogle } from "@/util/firebase/Authenticators";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import LoadingPage from "@/components/LoadingPage";

export default function Profile() {
    const [user, userinfo, loading, setLoading] = useContext(AuthContext);
    const router = useRouter();

    // handler
    // handles the delete
    const handleDelete = async () => {
        await reauthenticateWithGoogle();
        router.push("/");
        await user.delete();
        alert("Account Deleted");
    }

    // ensure that the user has been loaded
    const page = loading ? <LoadingPage /> :
        (
            <main className="main">
                <div className="navbar"><Navbar> </Navbar></div>
                <div className={`main_panel ${styles.container}`}>

                    <div className={styles.grid}>
                        Email:
                    </div>
                    <div className={styles.grid}>
                        {user.email}
                    </div>

                    <div className={styles.grid}>
                        Email Verified:
                    </div>
                    <div className={styles.grid}>
                        {user.emailVerified ? "Verified" : "Not Verified"}
                    </div>

                    <div className={styles.grid}>
                        Account Created:
                    </div>
                    <div className={styles.grid}>
                        {user.metadata.creationTime}
                    </div>

                    <div className={styles.grid}>
                        Last Signed In:
                    </div>
                    <div className={styles.grid}>
                        {user.metadata.lastSignInTime}
                    </div>

                    <div className={styles.grid}>
                        Delete Account:
                    </div>
                    <div className={styles.grid}>
                        <button className={styles.delete_button} onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </main>
        );

    return page;
}