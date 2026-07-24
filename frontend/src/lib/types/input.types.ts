import type { ChangeEvent } from "react";

export interface InputType {
  type: string;
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
