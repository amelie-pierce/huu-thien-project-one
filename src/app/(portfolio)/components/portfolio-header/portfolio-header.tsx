"use client"

import { Nav } from "@/components/ui";
import { navItems } from "@/data/portfolio";
import styles from "./portfolio-header.module.scss"

export default function PortfolioHeader() {

    return (
        <header className={styles.header}>
            <Nav items={navItems} />
        </header>
    );
}