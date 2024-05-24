import styles from "@/static/navbar.module.css"
import Link from "next/link"
import { logOut } from "@/util/Authenticators"
import { useRouter } from 'next/navigation'

export default function Navbar(){
    const router = useRouter();

    const handleLogOut = async(e) =>{
        try{
            await logOut();
            router.push("/");
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