import type { ReactNode } from "react";

export interface InputTypes {
  icon?: ReactNode;
  label: string;
  value: string;
  errors?: string;
  readonly?: boolean;
  onChange: () => void;
  row?:number
}

export interface SelectTypes {
  icon?: ReactNode;
  label: string;
  value: string;
  errors?: string;
  options: Item[];
  placeholder?: string;
  onChange: (e: string) => void;
  reverse?:boolean;
}

interface Item {
  label: string;
  value: string;
  description?: string;
}
