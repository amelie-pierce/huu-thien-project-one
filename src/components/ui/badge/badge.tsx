import React from "react";
import { cn } from "@/utils";
import styles from "./badge.module.css";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        styles.badge,
        styles[variant],
        styles[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}