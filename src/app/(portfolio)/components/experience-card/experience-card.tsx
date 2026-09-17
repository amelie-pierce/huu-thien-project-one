import { Heading, Text } from '@/components/ui/typography';

import { ArrowUpRightIcon } from '@/components/ui/icons/ArrowUpRight';
import { Card } from '@/components/ui';
import styles from './experience-card.module.scss';

interface ExperienceCardProps {
  company: string;
  role: string;
  description: string;
  period: string;
  url: string;
}

export function ExperienceCard({
  company,
  role,
  description,
  period,
  url,
}: ExperienceCardProps) {
  return (
    <Card
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.content}>
        <Heading as="h3" variant="card">
          {company} — {role}
        </Heading>
        <Text>{description}</Text>
        <Text>
          {period}
        </Text>
      </div>
      <div className={styles.icon}>
        <ArrowUpRightIcon />
      </div>
    </Card>
  );
}