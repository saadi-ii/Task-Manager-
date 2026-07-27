import { InputType } from "@/lib/types/input.types";

export const Input = ({ type, name, id, placeholder, value, defaultValue, onChange }: InputType) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      className={`border-2 ${type === "submit" ? "text-background" : "text-foreground"} py-1 px-3 rounded-2xl ${type === "submit" ? "bg-foreground" : ""}`}
    />
  );
};
