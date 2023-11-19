import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CourseCategories from "../../components/Categories/CourseCategories";
import HeroComponent from "../../components/Hero/Hero";
import { CssBaseline } from "@mui/material";

const Home = () => {
  return (
    <>
      <CssBaseline />
      <HeroComponent />
      <CourseCategories />
      <Footer />
    </>
  );
};

export default Home;
