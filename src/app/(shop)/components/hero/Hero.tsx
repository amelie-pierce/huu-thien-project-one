import { Heading, Text } from "@/components/ui";

import Image from "next/image";
import s from "./hero.module.scss";

export function Hero() {
  return (

    <section className={s.heroWrapper}>
      <div className={s.heroContainer}>
        <div className={s.content}>
          <Heading as="h1" variant="display" className={s.title}>
            Life begins
            <br />
            after coffee
          </Heading>
          <Text className={s.subtitle}>Because great coffee is the start of something even greater.</Text>
        </div>
        <div className={s.media}>
          <Image
            src="/images/shop/3-cups.png"
            alt="Three takeaway coffee cups"
            width={537}
            height={358}
            priority
            className={s.image}
          />
        </div>
      </div>
    </section>

  );
}
