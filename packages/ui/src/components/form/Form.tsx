import { Children } from "react";
import { SelectorButton } from "../button/Button";
import { BaseTextInput, PasswordInput, TextInputProps } from "../input/Input";
import * as styles from "./form.css";

interface FormProps {
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  error?: string;
}

export function BaseForm({ children, onSubmit, error }: FormProps) {
  return (
    <form className={styles.baseFormContainer} onSubmit={onSubmit}>
      {children}
      {error && (
        <>
          <p style={{ marginTop: "12px" }} />
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        </>
      )}
    </form>
  );
}

interface FormBlockProps {
  title: string;
  children?: React.ReactNode;
}

export function BaseFormBlock({ title, children }: FormBlockProps) {
  return (
    <div className={styles.formBlockContainer}>
      <div className={styles.formTag}>{title}</div>
      {children}
    </div>
  );
}

export function FormBlockTag({ title }: { title: string }) {
  return <div className={styles.formTag}>{title}</div>;
}

interface TextFormBlockProps
  extends FormBlockProps,
    Omit<TextInputProps, "onChange"> {
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function TextFormBlock({
  name,
  title,
  placeholder,
  onChange,
  value,
  disabled = false,
}: TextFormBlockProps) {
  return (
    <BaseFormBlock title={title}>
      <BaseTextInput
        name={name}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        disabled={disabled}
      />
    </BaseFormBlock>
  );
}

export function PasswordFormBlock({
  title,
  placeholder,
  onChange,
}: TextFormBlockProps) {
  return (
    <BaseFormBlock title={title}>
      <PasswordInput
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
    </BaseFormBlock>
  );
}

export function BoolButtonBlock({
  title,
  textList,
  selected,
  setSelected,
}: {
  title?: string;
  textList: string[];
  selected: string;
  setSelected: (value: string) => void;
}) {
  // caculate width by button counts
  const widthPercentage = (98 / textList.length).toFixed().concat("%");

  return (
    <BaseFormBlock title={title ? title : "SELECT"}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {textList.map((text) => (
          <SelectorButton
            key={text}
            text={text}
            selected={text === selected}
            widthPercentage={widthPercentage}
            handler={() => setSelected(text)}
          />
        ))}
      </div>
    </BaseFormBlock>
  );
}
