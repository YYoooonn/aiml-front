import * as styles from "./ui.css";

interface TextInputProps {
  title?: string;
  dispatch: React.Dispatch<React.SetStateAction<string>>;
}

export function TextInput({ title, dispatch }: TextInputProps) {
  return (
    <div className={styles.formInputBlock}>
      <div className={styles.formTag}>{title ? title : "INPUT"}</div>
      <input
        className={styles.textInput}
        type="text"
        onChange={(e) => dispatch(e.target.value)}
      ></input>
    </div>
  );
}

export function PasswordInput({ title, dispatch }: TextInputProps) {
  return (
    <div className={styles.formInputBlock}>
      <div className={styles.formTag}>{title ? title : "PASSWORD"}</div>
      <input
        className={styles.textInput}
        type="password"
        autoComplete="on"
        onChange={(e) => dispatch(e.target.value)}
      ></input>
    </div>
  );
}
