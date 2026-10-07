'use client';

import { Dialog, Text } from '@/components/ui';
import type { Product, Size } from '@/features/catalog/types';
import { useEffect, useRef, useState } from 'react';

import { SearchIcon } from '@/components/ui/icons';
import { SearchResultItem } from './SearchResultItem';
import { lineKey } from '@/features/cart/cart-reducer';
import { searchProductsRequest } from '../api';
import s from './product-search.module.scss';
import { useCart } from '@/features/cart/cart-context';
import { useDebounce } from '@/hooks/use-debounce';

type SearchResult = { query: string; products: Product[] };
type Toast = { message: string; key: string; prevQty: number };

export function ProductSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult>({ query: '', products: [] });
  const debounced = useDebounce(query.trim());
  const [toast, setToast] = useState<Toast | null>(null);
  const { lines, dispatch, openCart } = useCart();

  const loading = !!debounced && result.query !== debounced;
  const products = debounced && result.query === debounced ? result.products : [];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!debounced) return;
    const controller = new AbortController();

    searchProductsRequest(debounced, controller.signal)
      .then((products) => setResult({ query: debounced, products }))
      .catch((error) => {
        if (error.name !== 'AbortError') setResult({ query: debounced, products: [] });
      });

    return () => controller.abort();
  }, [debounced]);

  function close() {
    setOpen(false);
    setQuery('');
    setToast(null);
  }

  function addToCart(product: Product, size: Size, unitPrice: number) {
    const key = lineKey(product.id.toString(), size);
    const prevQty = lines.find((line) => line.key === key)?.qty ?? 0;

    dispatch({
      type: 'add',
      line: {
        productId: product.id.toString(),
        slug: product.slug,
        name: product.name,
        image: product.imageUrl,
        unitPrice,
        size,
      },
    });
    setToast({ message: `${product.name} (${size}) added to cart`, key, prevQty });
  }

  function undo() {
    if (!toast) return;
    dispatch({ type: 'setQty', key: toast.key, qty: toast.prevQty });
    setToast(null);
  }

  function viewCart() {
    close();
    openCart();
  }

  return (
    <>
      <button type="button" className={s.trigger} aria-label="Search products" onClick={() => setOpen(true)}>
        <SearchIcon size={24} />
      </button>

      <Dialog open={open} onClose={close} title="Search" className={s.dialog}>
        <input
          ref={inputRef}
          type="search"
          className={s.input}
          placeholder="Search products..."
          aria-label="Search products"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {loading && <Text className={s.status}>Searching...</Text>}
        {!loading && debounced && !products.length && (
          <Text className={s.status}>No products found.</Text>
        )}

        <ul className={s.list}>
          {products.map((product) => (
            <SearchResultItem key={product.id} product={product} onNavigate={close} onAdd={addToCart} />
          ))}
        </ul>

        {toast && (
          <div className={s.toast} role="status">
            <span className={s.toastMessage}>{toast.message}</span>
            <button type="button" className={s.toastAction} onClick={undo}>
              Undo
            </button>
            <button type="button" className={s.toastAction} onClick={viewCart}>
              View cart
            </button>
          </div>
        )}
      </Dialog>
    </>
  );
}
