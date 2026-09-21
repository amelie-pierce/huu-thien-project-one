import { CartIcon } from "@/components/ui/icons";
import s from "./cart-button.module.scss";

type Props = {
  count: number;
  onClick?: () => void;
};

export function CartButton({ count, onClick }: Props) {
  return (
    <button
      type="button"
      className={s.cart}
      onClick={onClick}
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <CartIcon size={36} />
      {count > 0 && (
        <span className={s.badgeCounter} aria-hidden="true">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}