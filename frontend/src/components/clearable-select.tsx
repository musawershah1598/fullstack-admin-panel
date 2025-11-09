import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { X } from "lucide-react";
import type { MouseEvent } from "react";

type ClearableSelectProps = {
  value: string;
  onValueChange: (e: string) => void;
  placeholder: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

const ClearableSelect = ({
  value,
  onValueChange,
  placeholder,
  options,
}: ClearableSelectProps) => {
  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    onValueChange("");
  };

  return (
    <div className="relative w-44">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {value && (
        <button
          onClick={handleClear}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ClearableSelect;
