import { Heading, Text } from '@/components/ui';

import { getImageProps } from 'next/image';
import { features } from '@/config/features';
import { PromoBanner } from '../promo-banner/PromoBanner';
import s from './hero.module.scss';

// Matches the `tablet-portrait` breakpoint in styles/_variables.scss
const DESKTOP_MEDIA = '(min-width: 601px)';

export function Hero() {
  const common = { alt: 'Takeaway coffee cups' };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: '/images/menu/3-cups.png', width: 537, height: 358 });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: '/images/menu/1-cup.png', width: 261, height: 344 });

  return (
    <>
      {features.openWorldPromo && <PromoBanner />}
      <section className={s.heroWrapper}>
        <div className={s.heroContainer}>
          <div className={s.content}>
            <Heading as="h1" variant="display" className={s.title}>
              Life begins
              <br />
              after coffee
            </Heading>
            <Text className={s.subtitle}>
              Because great coffee is the start of something even greater.
            </Text>
          </div>
          <div className={s.media}>
            <picture>
              <source media={DESKTOP_MEDIA} srcSet={desktopSrcSet} />
              <img
                {...imgProps}
                alt={common.alt}
                srcSet={mobileSrcSet}
                loading="eager"
                fetchPriority="high"
                className={s.image}
              />
            </picture>
          </div>
        </div>
      </section>
    </>
  );
}
