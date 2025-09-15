"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="border rounded px-3 py-1 w-56 dark:bg-transparent"
        aria-label="Search posts"
      />
      <button
        type="submit"
        className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700"
      >
        Search
      </button>
    </form>
  );
}


