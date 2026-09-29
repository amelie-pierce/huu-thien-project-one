import { Heading, Text } from "@/components/ui";

import Link from "next/link";
import type { Metadata } from "next";
import { SadFaceIcon } from "@/components/ui/icons";
import s from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className={s.page}>
      <div className={s.content}>
        <SadFaceIcon size={116} className={s.icon} />
        <Heading as="h1" className={s.title}>
          Page Not Found
        </Heading>
        <Text className={s.text}>
          We&apos;re sorry, the page you requested could not be found.
          <br />
          Please go back to the homepage.
        </Text>
        <Link href="/menu" className={s.button}>
          Go Home
        </Link>
      </div>
    </main>
  );
}
