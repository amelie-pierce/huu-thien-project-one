import Image from "next/image";
import styles from "./portfolio.module.css";
import { cn } from "@/ultils/utils";
import PortfolioHeader from "@/components/Header/Header";

export default function Home() {
  return (
    <div className={cn("portfolio-dark", styles.portfolio)}>
      <PortfolioHeader />
      <div>
        <aside>Sidebar content</aside>
        <main className={styles.main}>
          main content here
        </main>
      </div>
      <footer>Footer</footer>
    </div>
  );
}
