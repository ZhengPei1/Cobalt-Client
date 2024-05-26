import Link from "next/link";
import styles from "./loadingpage.module.css"

export default function LoadingPage(){

    return (
        <div className={styles.main}>
            Waiting For User To Load ...
            If You Didn't Sign In
            <Link href = "/">Sign In</Link>
        </div>
    )
}