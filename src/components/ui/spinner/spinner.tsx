import s from "./spinner.module.scss";

export function Spinner({ size = 20 }: { size?: number }) {
  return (
    <span
      className={s.spinner}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}
