'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useFetchUsers } from "./useFetchUsers";

export default function Home() {

  const {users, loader, lastItemRef} = useFetchUsers();

  return (
    <main className={styles.main}>
      {users.length &&
        <div  className={styles.cardContainer}>
        {users.map((user, i) => {
          if(i === users.length-1){
            return (
              <div ref={lastItemRef} key={user.id} className={styles.card}>
                <img className={styles.avatar} src={user.avatar_url} alt={user.login} width={100} height={100} />
                <div className={styles.title} >{user.login}</div>
              </div>
            )
          } else{
            return (
              <div key={user.id} className={styles.card}>
                <img className={styles.avatar} src={user.avatar_url} alt={user.login} width={100} height={100} />
                <div className={styles.title} >{user.login}</div>
              </div>
            )
          }
        })}
      </div>}
      {loader && <p>Loading more items...</p>}
    </main>
  );
}
