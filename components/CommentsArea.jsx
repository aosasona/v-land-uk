import axios from "axios";
import { useEffect } from "react";
import Moment from "react-moment";
import { API } from "../config/api";
const qs = require("qs");

const CommentsArea = ({ id, comments, setComments }) => {
  const filter = qs.stringify({
    filters: {
      articleId: {
        $eq: id,
      },
    },
    populate: "*",
  });

  useEffect(() => {
    const url = `${API}/feedbacks?${filter}`;
    const fetchData = async () => {
      const res = await axios.get(url);
      setComments(res.data.data);
    };
    fetchData();
  }, []);

  return (
    <section className="px-2 lg:pb-3">
      <h1 className="text-3xl lg:text-4xl">Comments</h1>
      <div className="w-full mt-2 lg:mt-3">
        {comments.length === 0 ? (
          <div className="text-primary text-opacity-60 text-xs text-center poppins mt-6 mb-8">
            No comments.
          </div>
        ) : (
          comments.map((comment, index) => (
            <div
              key={index}
              className="bg-primary bg-opacity-[0.05] py-4 px-5 mb-2 lg:mb-3 rounded-lg"
            >
              <div className="flex gap-x-1">
                <p className="text-xs tracking-wide">
                  {comment?.attributes?.name}
                </p>
                <Moment
                  format="MMM Do YYYY"
                  className="text-[10px] text-primary text-opacity-70 poppins"
                >
                  {comment?.attributes?.createdAt || Date.now()}
                </Moment>
              </div>
              <p className="text-primary text-[12px] lg:text-sm poppins tracking-wide leading-normal mt-2 mb-0">
                {comment?.attributes?.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentsArea;
