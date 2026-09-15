"use client"
import styles from "./header.module.css"

export default function PortfolioHeader() {


    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </header>
    );
}