"use client";

import s from "./chip-group.module.scss";

type Props<T extends string> = {
  label: string;
  name: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

export function ChipGroup<T extends string>({ label, name, options, value, onChange }: Props<T>) {
  return (
    <fieldset className={s.group}>
      <legend className={s.legend}>{label}</legend>
      <div className={s.options}>
        {options.map((option) => (
          <label key={option} className={s.chip} data-selected={option === value || undefined}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={option === value}
              onChange={() => onChange(option)}
              className={s.input}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
