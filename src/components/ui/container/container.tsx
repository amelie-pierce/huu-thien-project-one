import { cn } from "@/lib/cn";
import s from "./container.module.scss";

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "header" | "footer" | "nav";
};

export default function Container({ as: Tag = "div", className, ...rest }: Props) {
  return <Tag className={cn(s.container, className)} {...rest} />;
}