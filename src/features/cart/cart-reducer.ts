import type { CartLine, NewCartLine } from "./types";

export type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: NewCartLine; qty?: number }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

export const lineKey = (productId: string, size: string) => `${productId}:${size}`;

export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;

    case "add": {
      const key = lineKey(action.line.productId, action.line.size);
      const qty = action.qty ?? 1;
      const existing = state.find((line) => line.key === key);

      return existing
        ? state.map((line) => (line.key === key ? { ...line, qty: line.qty + qty } : line))
        : [...state, { ...action.line, key, qty }];
    }

    case "setQty":
      return action.qty <= 0
        ? state.filter((line) => line.key !== action.key)
        : state.map((line) => (line.key === action.key ? { ...line, qty: action.qty } : line));

    case "remove":
      return state.filter((line) => line.key !== action.key);

    case "clear":
      return [];

    default:
      return state;
  }
}
