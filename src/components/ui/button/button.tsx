import { Spinner } from "../spinner/spinner";
import { cn } from "@/lib/cn";
import s from "./button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  block,
  loading,
  disabled,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(s.button, className)}
      data-variant={variant}
      data-size={size}
      data-block={block || undefined}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner size={18} /> : children}
    </button>
  );
}
