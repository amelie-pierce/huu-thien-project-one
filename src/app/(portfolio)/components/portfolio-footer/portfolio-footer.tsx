"use client"

import { Nav, Text } from "@/components/ui";

import { navItems } from "@/data/portfolio";
import styles from "./portfolio-footer.module.scss"

export default function PortfolioFooter() {

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Text className={styles.name}>Thien N.</Text>
        <Nav items={navItems} type="transparent" />
      </div>
      <div className={styles.divider}></div>
      <Text className={styles.madeBy}>Made by Thien Nguyen</Text>
    </footer>
  );
}