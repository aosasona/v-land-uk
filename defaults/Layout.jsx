/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Head from "next/head";
import { Fade as Hamburger } from "hamburger-react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const Layout = ({ children, title, desc, keywords, page }) => {
  const [Open, setOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Function to toggle drawer
  const toggleDrawer = () => {
    // setOpen(isOpen ? false : true);
    onOpen();
  };
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
      <nav className="bg-white w-screen h-auto fixed top-0 drop-shadow-md z-[9]">
        <div className="flex justify-between items-center">
          <div className="h-[7vh] lg:h-[8vh] py-[1.8vh] px-5 lg:px-8 lg:py-[1.5vh]">
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
        </div>
        <div className="bg-neutral-100 py-2"></div>
      </nav>

      {children}

      {/* NAVIGATION DRAWER */}
      {Open && (
        <>
          <div className="h-screen w-[70vw] fixed top-0 left-0 bg-white z-[50] drop-shadow-lg"></div>
          <div className="h-screen w-screen bg-neutral-700 bg-opacity-40 fixed top-0 left-0 z-[40]"></div>
        </>
      )}

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>Hello</DrawerBody>
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
