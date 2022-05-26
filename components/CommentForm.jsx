import React from "react";
import { useState } from "react";
import Loader from "./Loader";

const CommentForm = ({ id, slug }) => {
  const [Data, setData] = useState({
    email: "",
    name: "",
    comment: "",
  });
  const [Loading, setLoading] = useState(false);

  //Input change handler
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  //Handle form submission
  const formHandler = (e) => {
    e.preventDefault();
    console.log(Data);
  };

  //Input style
  const inputStyle =
    "w-full px-4 py-4 mb-4 text-xs lg:text-sm leading-tight text-primary placeholder-neutral-300 border-2 border-primary border-opacity-30 rounded-lg focus:outline-none focus:border-opacity-100 transition-all";

  return (
    <main className="px-2 py-3">
      <h1 className="text-2xl lg:text-4xl">What do you think?</h1>
      {/* <h3 className="text-[11px] text-primary poppins pt-2">
        Let other readers know what you think about this topic or article.
      </h3> */}
      <form onSubmit={formHandler} className="mt-4 lg:mt-6">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-3">
          <input
            type="text"
            name="name"
            className={inputStyle}
            placeholder="Your name"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className={inputStyle}
            placeholder="Email Address"
            onChange={handleChange}
          />
        </div>
        <textarea
          name="comment"
          placeholder="I think this is a great article!"
          rows="8"
          required
          className={`${inputStyle} resize-none`}
          onChange={handleChange}
        ></textarea>
        <button
          className="w-full py-3 bg-primary text-white hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all  rounded-lg"
          disabled={Loading}
          type="submit"
        >
          {!Loading ? "Submit" : <Loader />}
        </button>
      </form>
    </main>
  );
};

export default CommentForm;
