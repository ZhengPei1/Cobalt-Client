import styles from "@/static/navbar.module.css"
import Link from "next/link"
import { logOut } from "@/util/Authenticators"
import { useRouter } from 'next/navigation'
import { useContext } from "react"
import { AuthContext } from "@/util/AuthContext"

export default function Navbar(){
    const router = useRouter();
    const [user, loading, setLoading] = useContext(AuthContext);

    const handleLogOut = async(e) =>{
        try{
            // set loading user state to true to prevent profile page rendering error
            setLoading(true); 
            router.push("/"); // redirect before logout
            await logOut();
            
        }catch(error){
            alert("logout failed");
        }
    }

    return (
        <div className={styles.navbar}>
            <Link href="/home" ><img title="home screen" src="/stock_info.svg"/></Link>
            <Link href="/trade"><img title="trade stock" src="/trade.svg" /></Link>
            <Link href="/profile"><img title="my profile" src="/profile.svg" /></Link>
            <img title="log out" src="/logout.svg" onClick={handleLogOut}/>
        </div>
    )
}