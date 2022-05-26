import React from "react";

const CommentsArea = ({ id, comments, setComments }) => {
  return (
    <section className="px-2">
      <h1 className="text-3xl lg:text-4xl">Comments</h1>
      <div className="w-full mt-2">
        {comments.length === 0 ? (
          <div className="text-primary text-opacity-60 text-xs text-center poppins mt-6 mb-8">
            No comments.
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};

export default CommentsArea;
