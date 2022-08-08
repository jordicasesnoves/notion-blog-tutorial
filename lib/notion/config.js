// lib/notion/config.js

import { Client } from "@notionhq/client";

export const databaseId = process.env.NOTION_DATABASE_ID;
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
