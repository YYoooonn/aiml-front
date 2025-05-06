import * as styles from "./login.css";
import { LoginForm } from "@/components/form";

export default function Login() {
  return (
    <div className={styles.loginPageContainer}>
      <LoginForm />
    </div>
  );
}
