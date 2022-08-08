const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    const getClassName = () => {
      const classArray = [];
      if (bold) classArray.push("bold");
      if (italic) classArray.push("italic");
      if (strikethrough) classArray.push("strikethrough");
      if (underline) classArray.push("underline");
      if (code) classArray.push("bold");
      return classArray.join(" ");
    };
    return (
      <span
        key={index + text.content}
        className={getClassName()}
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? (
          <a target="_blank" rel="noreferrer" href={text.link.url}>
            {text.content}
          </a>
        ) : code ? (
          <code>{text.content}</code>
        ) : (
          text.content
        )}
      </span>
    );
  });
};

export default Text;
