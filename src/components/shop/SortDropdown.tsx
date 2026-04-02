"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent border border-white/10 text-xs tracking-[0.15em] uppercase text-white/70 px-3 py-2 outline-none cursor-pointer hover:border-white/30 transition-colors"
    >
      <option value="newest" className="bg-black">Newest</option>
      <option value="price-asc" className="bg-black">Price: Low to High</option>
      <option value="price-desc" className="bg-black">Price: High to Low</option>
      <option value="name-az" className="bg-black">Name A-Z</option>
    </select>
  );
}
