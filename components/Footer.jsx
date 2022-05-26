/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Icon from "./Icon";

const Footer = () => {
  const [Mail, setMail] = useState("");

  //Get current year
  const year = new Date().getFullYear();

  //Handle form submission
  const emailSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <footer className="w-full bg-green-50 text-neutral-800 py-12 lg:py-16 px-4 mt-[8vh] lg:mt-[10vh]">
      <div className="w-full lg:w-4/6 2xl:w-3/5 mx-auto flex flex-col lg:flex-row gap-12 lg:gap-14 items-center justify-center lg:justify-evenly">
        {/* Sitemap */}
        <div className="flex justify-center items-center lg:gap-5">
          <div className="flex flex-col items-center justify-center px-4 gap-4 lg:gap-3">
            <img
              src="/Header.svg"
              alt="Header"
              className="h-9 lg:h-12 object-contain"
            />

            <div className="flex gap-2 lg:gap-2">
              <Icon url="http://instagramm.com/vlanduk">
                <FaInstagram size={13} />
              </Icon>
              <Icon url="https://www.facebook.com/V-Land-UK-100137252369546">
                <FaFacebookF size={13} />
              </Icon>
              <Icon url="https://twitter.com/vlandukmag">
                <FaTwitter size={13} />
              </Icon>
              <Icon url="https://www.linkedin.com/company/v-land-uk">
                <FaLinkedinIn size={13} />
              </Icon>
            </div>
          </div>

          <div className="h-full flex flex-col justify-center gap-2 border-l-2 border-primary text-sm font-medium py-2 lg:py-4 px-4">
            <div className="hover:text-primary hover:translate-x-1 transition-all">
              <Link href="/about">About</Link>
            </div>

            <div className="hover:text-primary hover:translate-x-1 transition-all">
              <Link href="/team">Team</Link>
            </div>

            <div className="hover:text-primary hover:translate-x-1 transition-all">
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        {/* Email subscriptions */}
        <div className="lg:w-[60%] 2xl:w-3/6">
          <h2 className="text-3xl lg:text-4xl text-center lg:text-left mb-1 px-1 lg:px-2">
            Subscribe
          </h2>
          <h4 className="text-neutral-500 text-[11px] lg:text-xs font-medium text-center lg:text-left my-5 px-3">
            Subscribe to our newsletter to receive the latest news and updates
            directly from us in your inbox. Best part? It&apos;s free!
          </h4>
          <form
            onSubmit={emailSubmit}
            className="w-[90%] mx-auto lg:w-full lg:mx-0 flex border-[2px] border-primary gap-2 px-1 py-1 rounded-3xl lg:rounded-[2rem]"
          >
            <input
              name="email"
              type="email"
              className="w-full bg-transparent text-sm focus:outline-none poppins placeholder-primary placeholder-opacity-30 font-medium px-3 lg:px-4 rounded-3xl"
              placeholder="Email address"
              onChange={(e) => setMail(e.target.value)}
            />
            <button
              type="submit"
              name="Subscribe"
              className="bg-primary hover:text-primary hover:bg-primary hover:bg-opacity-10 transition-all text-white text-xs font-semibold rounded-3xl poppins px-5 py-3 lg:py-4"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-[10px] font-medium lg:font-medium poppins mt-8 lg:mt-12">
        &copy;{year} V-Land UK. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
