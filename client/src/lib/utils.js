import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#4a2c7173] text-[#7b2ff7] border-[1px] border-[#7b2ff7aa]",
  "bg-[#2c4a7157] text-[#00b3ff] border-[1px] border-[#00b3ffaa]",
  "bg-[#2c715e57] text-[#00ff94] border-[1px] border-[#00ff94aa]",
];

export const getColor = (color) => {
  if(color >=0 && color < colors.length) return colors[color];
  return colors[0];
};
