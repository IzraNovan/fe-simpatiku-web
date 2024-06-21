import DomPurify from "isomorphic-dompurify";

const RenderHtml = ({ html }) => {
  const cleanHTML = DomPurify.sanitize(html);

  return (
    <div
      className="ck-content"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};

export default RenderHtml;
