import React from "react";

const Icon = ({ url, children, className }) => {
  return (
    <div className={className}>
      <a href={url} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    </div>
  );
};

Icon.defaultProps = {
  className:
    "w-max aspect-square p-2 text-white bg-primary rounded-full hover:scale-95",
};

export default Icon;
