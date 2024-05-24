"use client"
import { useRouter } from 'next/navigation'
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // request server to sign up the current user
    const response = await fetch(`${process.env.NEXT_PUBLIC_ND_SERVER_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "email": email, "password": password }),
    });

    // parse response, then redirect if needed
    try {
      const res = await response.text();
      alert(res);

      // go back to login page if registration succeeded
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error)
      alert(error.message);
    }


  };


  return (
    <main className={styles.main}>
      <form className={styles.email_login_form} onSubmit={handleSubmit}>
        <div className={styles.title}>Create Your <span className={styles.website_title}>Cobalt</span> Account</div>

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

        <Link href="/" style={{ gridArea: "sign-in" }}>Sign In</Link>

        <button type="submit" style={{ gridArea: "submit" }}>Create</button>

      </form>
    </main>
  )
}