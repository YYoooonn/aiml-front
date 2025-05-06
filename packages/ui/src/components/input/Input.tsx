import * as styles from "./input.css";

interface TextInputProps {
  title?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInput({ onChange, placeholder }: TextInputProps) {
  return (
    <input
      className={styles.textInput}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ? placeholder : "Enter text"}
    />
  );
}

export function PasswordInput({ onChange, placeholder }: TextInputProps) {
  return (
    <input
      className={styles.textInput}
      type="password"
      autoComplete="on"
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ? placeholder : "Enter password"}
    />
  );
}
