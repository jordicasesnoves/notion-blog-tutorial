import Text from "./Text";

const BlocksEnum = {
  paragraph: "paragraph",
  heading_1: "heading_1",
  heading_2: "heading_2",
  heading_3: "heading_3",
  image: "image",
  unsupported: "unsupported",
};

const ImageComponent = ({ value }) => {
  const src = value.type === "external" ? value.external.url : value.file.url;
  const caption = value.caption ? value.caption[0]?.plain_text : "";
  return (
    <figure>
      <img width="200" height="auto" src={src} alt={caption && caption} />
      {caption && (
        <figcaption className="text-primary-medium mt-1 italic font-normal">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const BlockRenderer = (block) => {
  const { type, id } = block;
  const value = block[type];

  const BlockTypes = {
    [BlocksEnum.paragraph]: (
      <p key={id}>
        <Text text={value.rich_text} />
      </p>
    ),
    [BlocksEnum.heading_1]: (
      <h1 key={id}>
        <Text text={value.rich_text} />
      </h1>
    ),
    [BlocksEnum.heading_2]: (
      <h2 key={id}>
        <Text text={value.rich_text} />
      </h2>
    ),
    [BlocksEnum.heading_3]: (
      <h3 key={id}>
        <Text text={value.rich_text} />
      </h3>
    ),
    [BlocksEnum.image]: <ImageComponent value={value} />,
  };

  const unsupportedBlock = (
    <div>
      <span role="img" aria-label="unsupported">
        ❌
      </span>{" "}
      Type {type} unsupported {type === "unsupported" && "by Notion API"}
    </div>
  );

  return BlockTypes[type] || unsupportedBlock;
};

export default BlockRenderer;
