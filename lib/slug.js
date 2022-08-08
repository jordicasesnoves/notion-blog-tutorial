import slugify from "slugify";

const getSlug = (postTitle) => slugify(postTitle).toLowerCase();

export default getSlug;
