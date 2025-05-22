import * as styles from "./input.css";

interface TextInputProps {
  title?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  query?: string;
  value?: string;
}

export function TextInput({ onChange, placeholder, value }: TextInputProps) {
  if (value)
    return (
      <TextInputWithValue
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    );
  return (
    <input
      className={styles.textInput}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ? placeholder : "Enter text"}
    />
  );
}

export function TextInputWithValue({
  onChange,
  placeholder,
  value,
}: TextInputProps) {
  return (
    <input
      className={styles.textInput}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ? placeholder : "Enter text"}
    />
  );
}

export function TextDebounceInput({ onChange, query }: TextInputProps) {
  return (
    <input
      className={styles.textInput}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      value={query}
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
