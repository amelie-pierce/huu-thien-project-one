"use client";

import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import s from "./checkbox.module.scss";
import { useId } from "react";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: React.ReactNode;
  className?: string;
};

export function Checkbox({ label, id, className, ...rest }: Props) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label htmlFor={inputId} className={cn(s.wrap, className)}>
      <input id={inputId} type="checkbox" className={s.input} {...rest} />
      <span className={s.box} aria-hidden="true">
        <CheckIcon size={20} />
      </span>
      <span className={s.label}>{label}</span>
    </label>
  );
}
