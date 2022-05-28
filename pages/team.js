/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import Back from "../components/Back";
import { API } from "../config/api";
import Layout from "../defaults/Layout";
import Image from "next/image";
import Icon from "../components/Icon";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Team = ({ excerpt, team }) => {
  const twitter = "https://twitter.com";
  const instagram = "https://instagram.com";
  const facebook = "https://facebook.com";
  const linkedin = "https://www.linkedin.com/in";

  return (
    <Layout
      title="Meet The Team"
      desc="The V-Land UK team are a bunch of like-minded vegan writers, bloggers, influencers, designers etc who are dedicated to bringing you the best vegan content from around the UK"
    >
      <Back />
      <main className="mt-4 px-2">
        <h1 className="text-4xl lg:text-5xl">Team</h1>
        <h2 className="text-primary text-sm font-medium lg:text-[16px] leading-relaxed poppins mt-4 px-1">
          {excerpt}
        </h2>

        <section className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5 gap-y-2 lg:gap-y-6 mt-10">
          {team?.length > 0 &&
            team.map((staff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full flex flex-col gap-2 bg-white rounded-xl shadow-sm  mb-4"
              >
                <div className="w-full grid grid-cols-2 items-center gap-3 lg:gap-5 px-4 lg:px-7 py-5">
                  <div className="w-[90%] lg:w-[90%] aspect-square rounded-full overflow-hidden">
                    <img
                      src={
                        staff?.attributes?.image?.data?.attributes?.formats
                          ?.small?.url ||
                        staff?.attributes?.image?.data?.attributes?.formats
                          ?.medium?.url ||
                        staff?.attributes?.image?.data?.attributes?.formats
                          ?.large?.url ||
                        "Placeholder.png"
                      }
                      alt={staff?.attributes?.name || "Staff"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-3xl lg:text-4xl text-primary">
                      {staff?.attributes?.name || "Staff"}
                    </h1>
                    <p className="text-xs lg:text-lg font-light poppins">
                      {staff?.attributes?.pronouns}
                    </p>
                    <p className="text-sm lg:text-lg font-semibold poppins">
                      {staff?.attributes?.position}
                    </p>
                    <div className="flex gap-2">
                      {staff?.attributes?.twitter && (
                        <Icon url={`${twitter}/${staff?.attributes?.twitter}`}>
                          <FaTwitter size={13} />
                        </Icon>
                      )}
                      {staff?.attributes?.linkedin && (
                        <Icon
                          url={`${linkedin}/${staff?.attributes?.linkedin}`}
                        >
                          <FaLinkedinIn size={13} />
                        </Icon>
                      )}
                      {staff?.attributes?.facebook && (
                        <Icon
                          url={`${facebook}/${staff?.attributes?.facebook}`}
                        >
                          <FaFacebookF size={13} />
                        </Icon>
                      )}

                      {staff?.attributes?.instagram && (
                        <Icon
                          url={`${instagram}/${staff?.attributes?.instagram}`}
                        >
                          <FaInstagram size={13} />
                        </Icon>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-primary bg-opacity-[0.03] text-primary font-medium poppins text-sm lg:text-base leading-relaxed mt-auto px-4 lg:px-7 py-5">
                  {staff?.attributes?.bio}
                </div>
              </motion.div>
            ))}
        </section>
      </main>
    </Layout>
  );
};

export async function getServerSideProps() {
  const excerptRequest = await fetch(`${API}/team-excerpt`);
  const excerpt = await excerptRequest.json();

  const teamRequest = await fetch(`${API}/teams?populate=*`);
  const team = await teamRequest.json();

  return {
    props: {
      excerpt: excerpt?.data?.attributes?.content,
      team: team?.data,
    },
  };
}

export default Team;
