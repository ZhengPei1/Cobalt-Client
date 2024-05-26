"use client"
import Link from "next/link";
import styles from "./page.module.css";
import GoogleButton from "react-google-button";
import { useState } from "react";
import { emailSignIn, googleSignIn} from "@/util/Authenticators";
import { useRouter } from 'next/navigation'

// this will be the login page
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await emailSignIn(email, password);
      router.push("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      await googleSignIn();
      router.push("/home");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.website_title}>Cobalt</div>

      <div className={styles.description}>
        Hone your trading skills in a risk-free environment
      </div>

      <div className={styles.auto_login_form}>
        <GoogleButton
          onClick={handleGoogleSignIn}
          className="button"
          style={{ "width": "100%"}}>
        </GoogleButton>
      </div>

      <form className={styles.email_login_form} onSubmit={handleEmailSignIn}>
        <div style={{ gridArea: "email" }}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ gridArea: 'email-input' }}
          />
        </div>

        <div style={{ gridArea: "password" }}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ gridArea: 'password-input' }}
          />

        </div>

        <Link href="/signup" style={{ gridArea: "create" }}>Create Account</Link>

        <button type="submit" style={{ gridArea: "submit" }}>Sign In</button>

      </form>
    </main>
  );
}
