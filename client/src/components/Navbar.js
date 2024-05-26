import styles from "./navbar.module.css"
import Link from "next/link"
import { logOut } from "@/util/Authenticators"
import { useRouter } from 'next/navigation'
import { useContext } from "react"
import { AuthContext } from "@/util/AuthContext"

export default function Navbar() {
    const router = useRouter();
    const [user, loading, setLoading] = useContext(AuthContext);

    const handleLogOut = async (e) => {
        try {
            // set loading user state to true to prevent profile page rendering error
            setLoading(true);
            router.push("/"); // redirect before logout
            await logOut();

        } catch (error) {
            alert("logout failed");
        }
    }

    return (
        <div className={styles.navbar}>
            <label className={styles.label}>Home</label>
            <Link href="/home" ><img title="home screen" src="/stock_info.svg" /></Link>

            <label className={styles.label}>Trade</label>
            <Link href="/trade"><img title="trade stock" src="/trade.svg" /></Link>

            <label className={styles.label}>Profile</label>
            <Link href="/profile"><img title="my profile" src="/profile.svg" /></Link>

            <label className={styles.label}>Log Out</label>
            <img title="log out"
                src="/logout.svg"
                className={styles.img}
                onClick={handleLogOut}/>
        </div>
    )
}