import React from "react";

const Icon = ({ url, children, className }) => {
  return (
    <div
      className={
        className ||
        "w-max aspect-square p-2 text-white bg-primary rounded-md hover:scale-95"
      }
    >
      <a href={url} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    </div>
  );
};

export default Icon;
