import Img from "gatsby-image";
import React from "react";
import { IAbout } from "../../contracts/about/iabout";
import { GetAbout } from "../../hooks/about/about-graphql";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./hero.scss";

const Hero = ({ }) => {
  const about: IAbout = GetAbout().sanityAbout;
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return <div style={{marginRight: 30, marginLeft: 30 }}>

        <h2>Now Available: {about.title}</h2>
        <p>{about.description}</p>
        <Slider {...settings}  >
          <div>
            <Img fluid={about.mainImage.asset.fluid} />
          </div>
        
    </Slider>
  </div> 
}

export default Hero