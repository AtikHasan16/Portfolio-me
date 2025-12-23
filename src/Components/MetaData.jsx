import React from "react";

const MetaData = ({ title, description, keywords, author }) => {
  return (
    <div>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </div>
  );
};

export default MetaData;
