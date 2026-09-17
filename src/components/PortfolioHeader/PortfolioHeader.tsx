"use client"

import Link from "next/link";
import styles from "./PortfolioHeader.module.scss"

export default function PortfolioHeader() {

    const menuItems = [
        { label: "Self", href: "#self" },
        { label: "Experience", href: "#experience" },
        { label: "Projects", href: "#projects" },
        { label: "Shop", href: "/menu" }
    ];

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}