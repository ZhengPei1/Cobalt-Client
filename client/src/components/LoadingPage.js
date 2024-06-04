import Link from "next/link";
import styles from "./loadingpage.module.css"

export default function LoadingPage(){

    return (
        <div className={styles.main}>
            <div className={styles.website_title}>Cobalt</div>

            <div>
                Waiting For User To Load ...
                If You Didn't Sign In 
            </div>

            <Link href = "/">Sign In</Link>

            <img src = "/icon.svg" className={styles.icon}/>

            
        </div>
    )
}