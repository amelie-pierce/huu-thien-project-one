import { Heading, Text } from "../typography";

import Link from "next/link";
import s from "./section-heading.module.scss";

type Props = {
  title: string;
  id?: string;
  action?: { label: string; href?: string };
};

export function SectionHeading({ title, id, action }: Props) {
  return (
    <div className={s.heading}>
      <Heading id={id} className={s.title}>
        {title}
      </Heading>
      {action && (
        action.href ?
          (<Link href={action.href} className={s.action}>
            {action.label}
          </Link>)
          : (
            <Text className={s.itemLengthLabel}>
              {action.label}
            </Text>
          )
      )}
    </div>
  );
}
