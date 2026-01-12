// ImageSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = (props) => { 
  console.log(props,"prop");
  
  const settings = {
    dots: true,              // Show navigation dots
    infinite: true,          // Loop slides
    speed: 500,              // Transition speed (ms)
    slidesToShow: 1,         // Show one slide at a time
    slidesToScroll: 1,       // Scroll one slide at a time
    autoplay: true,          // Auto slide
    autoplaySpeed: 3000,     // Delay between slides
    arrows: true,            // Show prev/next arrows
    responsive: [
      {
        breakpoint: 768,     // Mobile view
        settings: {
          arrows: false,     // Hide arrows on mobile
          dots: true
        }
      }
    ]
  };

  return (
    <div style={{ width: '400px',  margin: "auto",  }}>
      <Slider {...settings}>
        {props.image.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "600px",height:'300px',
                borderRadius: "8px"
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;