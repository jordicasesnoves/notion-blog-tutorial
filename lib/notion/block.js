// lib/notion/block.js

import { notion } from "./config";

export const getBlocks = async (blockId) => {
  const blocks = [];
  let cursor = undefined;

  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }

  return blocks;
};
