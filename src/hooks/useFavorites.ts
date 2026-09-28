import { useCallback, useEffect, useState } from "react";

const KEY = "alnoor:favorites";
const EVENT = "alnoor:favorites-changed";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  window.localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(read());
    const sync = () => setFavorites(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addFavorite = useCallback((id: string) => {
    const next = Array.from(new Set([...read(), id]));
    write(next);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    write(read().filter((x) => x !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    const current = read();
    write(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const clearFavorites = useCallback(() => write([]), []);

  return { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, clearFavorites };
}
