/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect } from "react";
import Layout from "../defaults/Layout";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import { GlobalContext } from "../context/GlobalContext";
import { API, BASE_URL } from "../config/api";
import { PAGINATION_LIMIT } from "../config/meta";
import AOS from "aos";
import "aos/dist/aos.css";
const qs = require("qs");

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
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5 lg:gap-y-6">
        {articles.map((article, index) => (
          <ArticleCard article={article} key={index} />
        ))}
      </div>
      <Pagination meta={meta} min={3} prefix="articles" />
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
    pagination: {
      pageSize: PAGINATION_LIMIT,
    },
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
