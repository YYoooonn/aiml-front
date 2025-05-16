import { SelectorButton } from "../button/Button";
import { PasswordInput, TextInput } from "../input/Input";
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
      {error ? (
        <>
          <p style={{ marginTop: "12px" }} />
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        </>
      ) : (
        <></>
      )}
    </form>
  );
}

interface FormBlockProps {
  title: string;
  placeholder?: string;
  children?: React.ReactNode;
}

function BaseFormBlock({ title, children }: FormBlockProps) {
  return (
    <div className={styles.formInputBlock}>
      <div className={styles.formTag}>{title}</div>
      {children}
    </div>
  );
}

interface TextFormBlockProps extends FormBlockProps {
  title: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function TextFormBlock({
  title,
  placeholder,
  onChange,
}: TextFormBlockProps) {
  return (
    <BaseFormBlock title={title}>
      <TextInput onChange={onChange} placeholder={placeholder} />
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
      <PasswordInput onChange={onChange} placeholder={placeholder} />
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

  console.log("widthPercentage", widthPercentage);
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
