import { Heading, Text } from '@/components/ui/typography';

import { ArrowUpRightIcon } from '@/components/ui/icons/ArrowUpRight';
import { Card } from '@/components/ui';
import Image from 'next/image';
import styles from './project-card.module.scss';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
}

export function ProjectCard({
  id,
  name,
  description,
  logo,
  url,
}: ProjectCardProps) {
  return (
    <Card
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.wrapper}>
        <div className={styles.logoContainer}>
          <Image
            id={id}
            src={logo}
            alt={`${name} logo`}
            width={125}
            height={125}
          />
        </div>

        <div className={styles.content}>
          <Heading as="h3" variant="card">
            {name}
          </Heading>
          <Text>{description}</Text>
        </div>
      </div>
      <div className={styles.icon}>
        <ArrowUpRightIcon />
      </div>
    </Card>
  );
}