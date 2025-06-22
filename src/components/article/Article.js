import "./Styles.css";

const Article = ({ blocks }) => {
  const renderBlock = (block, i) => {
    switch (block.type) {
      case "header":
        return (
          <header key={i} className="fs-1 fw-bolder">
            {block.value}
          </header>
        );
      case "text":
        return block.value.map((paragraph, j) => (
          <p key={j} className="fs-5 text-muted">
            {paragraph}
          </p>
        ));
      case "image":
        return <img key={i} src={block.value} alt="" />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="article thin-section">
        {blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  );
};

export default Article;
