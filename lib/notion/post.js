// lib/notion/post.js
import { notion, databaseId } from "./config";
import { getPageProperties } from "./page";

export const getPost = async (postPageId) => {
  const page = await notion.pages.retrieve({
    page_id: postPageId,
  });

  const pageId = postPageId;
  const {
    description,
    title,
    readTime,
    publicationDate,
    categories,
    coverUrl,
  } = await getPageProperties(page, pageId);

  return {
    pageId,
    title,
    description,
    readTime,
    publicationDate,
    categories,
    coverUrl,
  };
};

export const getPosts = async () => {
  const pages = [];
  let cursor = undefined;

  while (true) {
    const { results, next_cursor } = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      filter: {
        property: "published",
        checkbox: {
          equals: true,
        },
      },
    });
    pages.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  const posts = [];
  for (const page of pages) {
    const pageId = page.id;
    const {
      title,
      description,
      readTime,
      publicationDate,
      categories,
      coverUrl,
    } = await getPageProperties(page, pageId);
    posts.push({
      pageId,
      description,
      title,
      readTime,
      publicationDate,
      categories,
      coverUrl,
    });
  }
  return posts;
};
