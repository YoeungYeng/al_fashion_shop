import { ListFilterIcon } from "lucide-react";

interface FilterButtonProps {
  onClick: () => void;
  hasActiveFilters?: boolean;
  label: string;
  className?: string;
}

export function FilterButton({
  onClick,
  hasActiveFilters = false,
  label,
  className = "",
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded px-5 py-2.5 border font-normal text-gray-700 transition-all flex items-center gap-2 ${className}`}
    >
      <ListFilterIcon size={18} />

      <span>{label}</span>

      {hasActiveFilters && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-white text-[10px] bg-red-600 flex items-center justify-center rounded-full">
          !
        </span>
      )}
    </button>
  );
}