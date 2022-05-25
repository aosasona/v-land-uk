/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect } from "react";
import Layout from "../defaults/Layout";
import { API, BASE_URL } from "../config/api";
const qs = require("qs");
import AOS from "aos";
import "aos/dist/aos.css";
import { GlobalContext } from "../context/GlobalContext";
import ArticleCard from "../components/ArticleCard";
export default function Home({ articles, meta }) {
  const { findUserByID, setArticles } = useContext(GlobalContext);
  useEffect(() => {
    setArticles(articles);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
    AOS.refresh();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
        {articles.map((article, index) => (
          <ArticleCard article={article} key={index} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  //Get data for articles
  const filters = qs.stringify({
    populate: "*",
  });

  const response = await fetch(`${API}/articles?${filters}`);
  const data = await response.json();

  //Get data for users

  return {
    props: {
      articles: data.data,
      meta: data.meta,
    },
  };
}
