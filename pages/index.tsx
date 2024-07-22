import Head from "next/head";
import Image from "next/image";
import Board from "@/components/board";
import Score from "@/components/score";
import styles from "@/styles/index.module.css";

export default function Home() {
  return (
    <div className={styles.twenty48}>
      <Head>
        <title>Play 2048</title>
        <meta
          name="description"
          content="Fully-functional 2048 game built in NextJS and TypeScript. Including animations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon16.png" />
      </Head>
      <header>
        <h1>2048</h1>
        <Score />
      </header>
      <main>
        <Board />
      </main>
      <div>
        <h2>
          🚀 <span>Congrats you have Successfully deployed 2048 Game on EKS with Jenkins CI/CD | DevSecOps</span>
        </h2>
      </div>
      <footer>
        <div className={styles.socials}>
          <a
            href="https://github.com/maheshreddy32825/2048.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the GitHub Repository
          </a>
        </div>
      </footer>
    </div>
  );
}