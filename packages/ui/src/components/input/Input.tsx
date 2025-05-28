import * as styles from "./input.css";

export interface TextInputProps {
  name?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps {
  name?: string;
  value?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export function BaseTextInput({
  value,
  onChange,
  name = "textInput",
  type = "text",
  placeholder = "Enter text",
}: TextInputProps) {
  if (value)
    return <BaseInput {...{ value, onChange, name, type, placeholder }} />;
  else
    return <BaseInputWithoutValue {...{ name, type, onChange, placeholder }} />;
}

function BaseInput({ name, value, type, onChange, placeholder }: InputProps) {
  return (
    <input
      className={styles.textInput}
      type={type ? type : "text"}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder ? placeholder : "Enter text"}
    />
  );
}

function BaseInputWithoutValue({
  name,
  type,
  onChange,
  placeholder,
}: Omit<InputProps, "value">) {
  return (
    <input
      className={styles.textInput}
      name={name ? name : "textInput"}
      type={type ? type : "text"}
      onChange={onChange}
      placeholder={placeholder ? placeholder : "Enter text"}
    />
  );
}

export function PasswordInput({
  onChange,
  placeholder,
}: Omit<TextInputProps, "value">) {
  return (
    <input
      className={styles.textInput}
      type="password"
      autoComplete="on"
      onChange={onChange}
      placeholder={placeholder ? placeholder : "Enter password"}
    />
  );
}
