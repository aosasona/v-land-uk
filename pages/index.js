/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Moment from "react-moment";
import Head from "next/head";
import Image from "next/image";
import Layout from "../defaults/Layout";
import { API, BASE_URL } from "../config/api";
import Link from "next/link";
const qs = require("qs");
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUserCircle } from "react-icons/fa";

export default function Home({ articles, meta }) {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
    AOS.refresh();
  }, []);

  //FIND SPONSORED POSTS
  const Sponsored = (post) => {
    const AddClass = post.some((cat) => {
      if (cat.attributes.name === "Sponsored") {
        return true;
      } else {
        return false;
      }
    });

    if (AddClass) {
      return "sponsored col-span-2";
    }
  };
  return (
    <Layout>
      <div
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-5
      mb-[5vh]"
      >
        {articles.map((article, index) => (
          <div
            key={index}
            className={`w-full bg-white rounded-xl drop-shadow-md overflow-hidden article-container ${Sponsored(
              article.attributes?.categories?.data
            )}`}
            data-aos="fade-up"
          >
            <div className="relative">
              <img
                src={`${article.attributes?.media?.data[0]?.attributes?.formats?.medium?.url}`}
                className="w-full aspect-square object-cover"
                alt={`${article.attributes?.media?.data[0]?.attributes?.alternativeText}`}
              />
              <div className="absolute flex flex-wrap gap-2 bottom-3 w-[94%] mx-auto right-0 left-0">
                {/* TAGS/CATEGORIES */}
                {article.attributes?.categories?.data.length > 0 &&
                  article.attributes.categories.data.map(
                    (category, current) => (
                      <p
                        key={current}
                        className={`text-[9px] lg:text-[10px]  px-2 py-1 rounded-2xl drop-shadow-md cursor-pointer hover:bg-primary hover:text-white hover:scale-95 transition-all tag ${
                          category.attributes.name === "Sponsored"
                            ? "text-white bg-purple-600"
                            : "text-primary bg-green-50"
                        }`}
                        onClick={() =>
                          router.push(`/category/${category.attributes.slug}`)
                        }
                      >
                        {category.attributes.name}
                      </p>
                    )
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

              <h1 className="text-[1.75rem] lg:text-4xl leading-tight article-title">
                <Link href={`/article/${article.attributes.slug}`}>
                  {article.attributes.title}
                </Link>
              </h1>
              <p className="text-[11px] lg:text-xs mt-1 lg:mt-2 poppins">
                {article.attributes.description}
              </p>
              <div className="w-max text-white bg-primary flex items-center space-x-1 mt-3 px-2 py-[5px] rounded-2xl">
                <FaUserCircle />
                <p className="text-[9px] lg:text-[10px] text-neutral-100 poppins font-semibold">
                  {article.attributes.author?.data?.attributes?.name ||
                    "Will Callaghan"}
                </p>
              </div>
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

  const filters = qs.stringify({
    populate: "*",
  });

  const response = await fetch(`${API}/articles?${filters}`);
  const data = await response.json();

  // console.log(data.data);
  return {
    props: {
      articles: data.data,
      meta: data.meta,
    },
  };
}
