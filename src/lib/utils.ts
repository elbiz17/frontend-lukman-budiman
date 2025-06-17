import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function toIDR(number: any) {
  if (isNaN(number)) return "IDR 0,00";

  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
    .format(number)
    .replace("IDR", "Rp");
}