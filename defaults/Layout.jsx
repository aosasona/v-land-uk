/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { Fade as Hamburger } from "hamburger-react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
  Box,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import NavLink from "../components/NavLink";
import { AnimatePresence, motion } from "framer-motion";

const Layout = ({ children, title, desc, keywords, page }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Open, setOpen] = useState(false);
  const [Nav, setNav] = useState(true);

  //Function to toggle drawer
  const toggleDrawer = () => {
    // setOpen(isOpen ? false : true);
    onOpen();
  };

  //Event listener for the links
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (scrollY > 200) {
        setNav(false);
      } else {
        setNav(true);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://v-land.co.uk" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://v-land.co.uk" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={desc} />
        <meta property="twitter:image" content="" />

        <meta property="og:site_name" content="Frikax" />
        <meta property="og:site" content="https://v-land.co.uk" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <title>
          {page} - {title}
        </title>
      </Head>

      <nav className="bg-transparent w-screen h-auto fixed top-0 drop-shadow-md z-[999]">
        <div className="relative bg-white flex justify-between items-center py-1 px-5 lg:px-8 z-[999]">
          <button className="hidden lg:block bg-primary text-white text-sm py-2 px-6 rounded-3xl hover:bg-transparent hover:border-[1.5px] border-primary hover:text-primary transition-all">
            Subscribe
          </button>
          <div className="h-[7vh] lg:h-[8vh] py-[1.8vh] lg:py-[1.5vh]">
            <img src="/Header.svg" alt="Header" className="h-full" />
            {/* <img src="/Header.svg" /> */}
          </div>
          <div className="lg:hidden">
            <Hamburger
              color="#4BAC48"
              size={22}
              toggled={isOpen}
              toggle={toggleDrawer}
            />
          </div>
          <div className="hidden lg:flex w-1/4 border-[1px] border-primary justify-between rounded-3xl overflow-hidden px-1 py-1">
            <input
              name="SearchText"
              type="text"
              placeholder="Search anything..."
              className="w-full px-3 py-1 text-[16px] placeholder-neutral-300 text-neutral-800 focus:outline-none"
            />
            <button className="bg-primary text-white h-auto aspect-square p-2 rounded-full">
              <BiSearch size={20} />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {Nav && (
            <motion.div
              initial={{ y: -45, originY: "top", zIndex: 0 }}
              animate={{ opacity: 1, y: 0, originY: "top", zIndex: 0 }}
              transition={{ duration: 0.2 }}
              exit={{ y: -45, originY: "top", zIndex: 0 }}
            >
              <div className="h-auto bg-green-50 flex space-x-3 flex-nowrap 2xl:justify-center overflow-x-scroll py-[10px] px-4">
                <NavLink link="/home">Home</NavLink>
                <NavLink link="/category/articles">Articles</NavLink>
                <NavLink link="/category/interviews">Interviews</NavLink>
                <NavLink link="/category/food-drink">Food & Drink</NavLink>
                <NavLink link="/category/lifestyle">Lifestyle</NavLink>
                <NavLink link="/category/fashion-beauty">
                  Fashion & Beauty
                </NavLink>
                <NavLink link="/category/recipes">Recipes</NavLink>
                <NavLink link="/category/health-wellbeing">
                  Health & Wellbeing
                </NavLink>
                <NavLink link="/category/shopping">Shopping</NavLink>
                <NavLink link="/category/entertainment">Entertainment</NavLink>
                <NavLink link="/category/environment">Environment</NavLink>
                <NavLink link="/category/shoutout">Shoutout</NavLink>
                <NavLink link="/category/europe">Europe</NavLink>
                <NavLink link="/category/events">Events</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="w-[90%] lg:w-4/5 2xl:w-4/6 mx-auto mt-[16vh] lg:mt-[17vh]">
        {children}
      </main>

      {/* NAVIGATION DRAWER */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader>
            <Box width="40%" mt={6} mb={8} mx="auto">
              <img src="/Header.svg" alt="Header" className="w-full" />
            </Box>
            <div className="flex border-[1px] border-primary justify-between rounded-3xl overflow-hidden px-1 py-1">
              <input
                name="SearchText"
                type="text"
                placeholder="Search anything..."
                className="px-3 py-1 text-[16px] placeholder-neutral-300 text-neutral-800 focus:outline-none"
              />
              <button className="bg-primary text-white h-auto aspect-square p-2 rounded-full">
                <BiSearch size={20} />
              </button>
            </div>
          </DrawerHeader>
          <DrawerBody fontSize={18}>
            <div className="flex flex-col space-y-5 px-2">
              <div className="hover:text-primary hover:translate-x-3 transition-all font-semibold">
                <Link href="/">Home</Link>
              </div>

              <div className="hover:text-primary hover:translate-x-3 transition-all font-semibold">
                <Link href="/shop">Shop</Link>
              </div>

              <div className="hover:text-primary hover:translate-x-3 transition-all font-semibold">
                <Link href="/join-us">Join Us</Link>
              </div>

              <div className="hover:text-primary hover:translate-x-3 transition-all font-semibold">
                <Link href="/about">About</Link>
              </div>

              <div className="hover:text-primary hover:translate-x-3 transition-all font-semibold">
                <Link href="/contact">Contact</Link>
              </div>

              <div className="flex py-3 space-x-4">
                <div className="p-2 text-white bg-primary">
                  <a href="http://instagramm.com/vlanduk">
                    <FaInstagram size={18} />
                  </a>
                </div>
                <div className="p-2 text-white bg-primary">
                  <a href="https://www.facebook.com/V-Land-UK-100137252369546">
                    <FaFacebookF size={18} />
                  </a>
                </div>
                <div className="p-2 text-white bg-primary">
                  <a href="https://twitter.com/vlandukmag">
                    <FaTwitter size={18} />
                  </a>
                </div>
                <div className="p-2 text-white bg-primary">
                  <a href="https://www.linkedin.com/company/v-land-uk">
                    <FaLinkedinIn size={18} />
                  </a>
                </div>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "V-Land UK",
  page: "Home",
  keywords: "vland, vegan, uk, green, nutritional, v-l, v-land, v",
  desc: "V-Land",
};
