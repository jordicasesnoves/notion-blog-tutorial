import { Fragment } from "react";
import Head from "next/head";
import { getPost, getPosts, getBlocks } from "../../lib/notion";
import getSlug from "../../lib/slug";
import Link from "next/link";
import BlockRenderer from "../../components/BlockRenderer";

const ArticlePage = ({ post, blocks }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <Link href="/">Go Back</Link>
        <h1>{post.title}</h1>
        <p>Published: {post.publicationDate}</p>
        <img width="400" height="auto" src={post.coverUrl} />

        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>
              <BlockRenderer {...block} />
            </Fragment>
          ))}
        </section>
      </article>
    </>
  );
};

export default ArticlePage;

export const getStaticPaths = async () => {
  const posts = await getPosts();
  return {
    paths: posts.map((post) => ({
      params: {
        slug: getSlug(post.title),
        postId: post.pageId,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { slug, postId } = context.params;
  const post = await getPost(postId);
  /* Redirect to 404 */
  if (!post) return { notFound: true };

  const blocks = await getBlocks(post.pageId);

  return {
    props: {
      post,
      slug,
      blocks,
    },
    revalidate: 1,
  };
};
