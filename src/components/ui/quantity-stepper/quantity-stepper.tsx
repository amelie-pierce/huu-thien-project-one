"use client";

import { MinusIcon, PlusIcon } from "../icons";

import s from "./quantity-stepper.module.scss";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
};

export function QuantityStepper({ value, onChange, min = 1, max = 99, label = "Quantity" }: Props) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  return (
    <div className={s.stepper}>
      <button
        type="button"
        className={s.button}
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <MinusIcon size={14} />
      </button>
      <input
        className={s.value}
        type="text"
        inputMode="numeric"
        value={value}
        aria-label={label}
        onChange={(event) => {
          const next = Number(event.target.value.replace(/\D/g, ""));
          if (Number.isFinite(next) && next > 0) onChange(clamp(next));
        }}
      />
      <button
        type="button"
        className={s.button}
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <PlusIcon size={14} />
      </button>
    </div>
  );
}
