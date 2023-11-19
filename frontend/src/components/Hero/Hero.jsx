import React from "react";
import "./Hero.css";
import HeroImage from "../../assets/e-learning-2.jpg";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="image-container">
          {/* Your image component goes here */}
          <img src={HeroImage} style={{width: "500px"}} alt="Hero Image" />
        </div>
        <div className="text-container">
          <h1>Your Dummy Text</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            consectetur justo eu ex vehicula, eu hendrerit metus fermentum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
