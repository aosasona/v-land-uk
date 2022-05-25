/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Icon from "./Icon";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-100 text-neutral-800 py-10 lg:py-14 px-4 mt-[7vh]">
      <div className="w-full lg:w-4/6 flex flex-col lg:flex-row lg:gap-4 items-center justify-center">
        {/* Sitemap */}
        <div className="flex justify-center items-center lg:gap-5">
          <div className="flex flex-col items-center justify-center px-4 gap-4 lg:gap-3">
            <img
              src="/Header.svg"
              alt="Header"
              className="h-9 lg:h-12 object-contain"
            />

            <div className="flex gap-2 lg:gap-2 scale-80 lg:scale-100">
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

          <div className="h-full flex flex-col justify-center gap-2 border-l-2 border-primary text-sm font-medium py-1 px-4">
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
      </div>
    </footer>
  );
};

export default Footer;
