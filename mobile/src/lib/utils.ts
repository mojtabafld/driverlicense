// shadcn/ui's class-name helper: joins Tailwind classes and lets a later one win over an earlier one of the same kind.
// (Only the web components copied from shadcn registries use it, src/components/ui; the app itself is styled with
// React Native's styles.)
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
