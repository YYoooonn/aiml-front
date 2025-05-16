import { ToggleSmallAnimated } from "../icons";
import * as styles from "./socket.css";

export function ProfileImages({ users }: { users: string[] }) {
  return (
    <div className={styles.profileImgContainer}>
      {users.map((_, i) => {
        return <div key={i} className={styles.profileIcon} />;
      })}
    </div>
  );
}

export function SocketHeader({connected, show, setShow}: {connected: boolean, show: boolean, setShow: (value: boolean) => void}) {
  return (
    <div className={styles.socketHeaderContainer} onClick={() => setShow(!show)}>
      <ToggleSmallAnimated show={show}/>
      <p className={styles.socketHeader}>
        {connected ? "CONNECTED" : "NO CONNECTION"}
      </p>
    </div>
  )
}

export function SocketModule({
  connected,
  users,
}: {
  connected: boolean;
  users: string[];
}) {
  return (
    <div className={styles.socketContainer}>
      <ProfileImages users={users} />
      <div style={{ padding: "2px" }} />
      {users.map((u, i) => {
        return (
          <div key={i} className={styles.socketUserText}>
            {u}
          </div>
        );
      })}
    </div>
  );
}
