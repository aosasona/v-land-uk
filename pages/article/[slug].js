import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Moment from "react-moment";
import { API } from "../../config/api";
import Layout from "../../defaults/Layout";
import ReactMarkdown from "react-markdown";
import Back from "../../components/Back";
const qs = require("qs");
const parse = require("html-react-parser");

const Article = ({ article }) => {
  const router = useRouter();
  //   console.log(article);
  return (
    <Layout
      title={article.attributes.title}
      desc={article?.attributes?.description || article?.attributes?.content}
      keywords={
        article?.attributes?.keywords ||
        "vland, magazine, article, vegan, v-land, uk, brazil, veggy"
      }
      image={article.attributes.media.data[0].attributes.formats.medium.url}
    >
      <Back />
      <main className="grid grid-cols-1 gap-0 lg:grid-cols-12 lg:gap-4">
        <section className="lg:col-span-9">
          <div className="relative w-full max-w-[100%] aspect-square lg:h-[40vh] mt-4 mb-4 lg:mb-8 rounded-2xl overflow-hidden object-cover">
            <Image
              src={
                article.attributes.media.data[0].attributes.formats.large.url
              }
              alt={article.attributes.media.data[0].attributes.alternativeText}
              layout="fill"
            />
            <div className="absolute flex flex-wrap gap-2 bottom-2 lg:bottom-4 w-[95%] mx-auto right-0 left-0">
              {article.attributes?.categories?.data.length > 0 &&
                article.attributes.categories.data.map((category, current) => (
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
                ))}
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl mt-2 lg:mt-3">
            {article.attributes.title}
          </h1>
          {/* AUTHOR AND DATE */}
          <div className="flex items-center space-x-2 mt-3">
            <Moment
              format="MMM Do YYYY"
              className="text-[10px] lg:text-xs py-1 lg:py-[6px] px-3 lg:px-4 bg-primary bg-opacity-[0.08] text-primary rounded-2xl"
            >
              {article.attributes.publishedAt}
            </Moment>
            <h3 className="poppins text-xs lg:text-[13px] font-semibold text-primary text-opacity-80 px-1">
              {article?.attributes?.author?.data?.attributes?.name ||
                "Will Callaghan"}
            </h3>
          </div>
          <div className="text-neutral-600 leading-loose lg:text-lg px-1 mt-4 mb-5 article-body">
            {/* <ReactMarkdown> */}
            {parse(article?.attributes?.content)}
            {/* </ReactMarkdown> */}
          </div>
        </section>
        <section className="col-span-3">
          <h1 className="text-5xl mt-2">More</h1>
        </section>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  const filter = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: "*",
  });

  const query = await fetch(`${API}/articles?${filter}`);
  const data = await query?.json();

  return {
    props: {
      article: data?.data[0],
    },
  };
}

export default Article;
