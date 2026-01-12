import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
function HomePage1(){

    const image=[
     "src/assets/home_image2.jpg",
     "src/assets/home_image1.png",
     "src/assets/image15.jpg",
     "src/assets/image6.jpg",
     "src/assets/image3.jpg",


    ]
      const settings = {
    dots: true,              // Show navigation dots
    infinite: true,          // Loop slides
    speed: 500,              // Transition speed (ms)
    slidesToShow: 1,         // Show one slide at a time
    slidesToScroll: 1,       // Scroll one slide at a time
    autoplay: true,          // Auto slide
    autoplaySpeed: 2000,     // Delay between slides
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
    return(
        <>
      <div  style={{height:'600px' , backgroundColor: '#141414',  color: '#fff',padding:"10px"}}>
      <Slider {...settings}>
        {image.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",height:'600px',
                borderRadius: "8px"
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
       
        
        </>
    )
}
export default HomePage1