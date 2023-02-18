import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import { getPostsData } from "../lib/posts";
import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";

//SSG
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

//SSR
// export async function getServerSideProps(context) {
//   return {
//     props: {},
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>私はプログラミングの勉強をしています。現在はReactを学習中です。</p>
      </section>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, data, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <span className={utilStyle.boldText}>{title}</span>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{data}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
