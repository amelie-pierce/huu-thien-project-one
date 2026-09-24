import { CartButton, Container, Nav } from "@/components/ui";

import s from "./header.module.scss";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className={s.header}>
      <Container className={s.inner}>
        <Nav items={siteConfig.nav as any} ></Nav>
        <CartButton />
      </Container>
    </header>
  );
}