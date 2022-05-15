/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Moment from "react-moment";
import Head from "next/head";
import Image from "next/image";
import Layout from "../defaults/Layout";
import { API, BASE_URL } from "../config/api";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home({ articles, meta }) {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
    AOS.refresh();
  }, []);
  return (
    <Layout>
      <div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-5
      mb-[5vh]"
      >
        {articles.map((article, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-xl drop-shadow-md overflow-hidden article-container"
            data-aos="fade-up"
          >
            <div className="relative">
              <img
                src={`${article.attributes.media.data[0].attributes.url}`}
                className="w-full aspect-square object-cover"
                alt={`${article.attributes.media.data[0].attributes.alternativeText}`}
              />
              <div className="absolute flex flex-wrap gap-2 bottom-3 w-[94%] mx-auto right-0 left-0">
                {article.attributes.categories.data.length > 0 ? (
                  article.attributes.categories.data.map(
                    (category, current) => (
                      <p
                        key={current}
                        className="text-[10px] text-white bg-purple-800 px-2 py-1 rounded-2xl drop-shadow-md tag"
                      >
                        {category.attributes.name}
                      </p>
                    )
                  )
                ) : (
                  <p className="text-[10px] text-white bg-primary px-2 py-1 rounded-2xl drop-shadow-md tag">
                    Articles
                  </p>
                )}
              </div>
            </div>
            {/* POST BODY */}
            <div className="px-3 pt-2 pb-4">
              <Moment
                format="MMM Do YYYY"
                className="text-[10px] lg:text-xs py-2"
              >
                {article.attributes.publishedAt}
              </Moment>

              <p className="text-[1.75rem] lg:text-4xl leading-tight article-title">
                <Link href={`/${article.attributes.slug}`}>
                  {article.attributes.title}
                </Link>
              </p>
              <p className="text-[11px] lg:text-xs mt-2 lg:mt-3 poppins">
                {article.attributes.description}
              </p>
              <p></p>
            </div>
          </div>
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

  const response = await fetch(`${API}/articles?populate=*`);
  const data = await response.json();

  // console.log(data.data);
  return {
    props: {
      articles: data.data,
      meta: data.meta,
    },
  };
}
