// pages/index.js

import { getPosts } from "../lib/notion";
import getSlug from "../lib/slug";
import Head from "next/head";
import Link from "next/link";

const HomePage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Your Blog</title>
      </Head>
      <main>
        {posts.map((post) => {
          const postHref = `/${post.pageId}/${getSlug(post.title)}`;
          return (
            <Link href={postHref} key={post.pageId}>
              <a>
                <h2>{post.title}</h2>
                <p>Published: {post.publicationDate}</p>
                <p>Read time: {post.readTime} min</p>
              </a>
            </Link>
          );
        })}
      </main>
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
};
