import Slider from "react-slick";

function HomePage2() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const data = [
    {
      title: "Kerala Mural Painting",
      description: "Kerala mural paintings have their origins in about the seventh or eighth centuries AD, temples dating to which period are the earliest that have been found. Most paintings have been dated to the period of the ninth to twelfth centuries. Some of the oldest murals, and the oldest extant paintings of the Kerala school of mural paintings can be found on the walls of the rock cut cave temples of Thrunanadikkara and Tiruvanchikulam, dated to about the ninth century AD. Kerala Murals were heavily influenced by Pallava art and culture, since they grew under the Pallavas’ patronage. ",
      image: [
        "src/assets/image2.jpg",
        "src/assets/image4.jpg",
        "src/assets/image13.png",
      ],
    },
    {
      title: "Traditional Nettipattam",
      description: "Traditional Nettipattam, also known as the elephant caparison, is a stunning piece of art that adds charm and elegance to any occasion. These beautifully crafted umbrellas have a rich history and are an integral part of Kerala's cultural heritage. They are used to decorate elephants during festivals and are also used as wall hangings in homes and offices. The Nettipattam is made of copper and gold, and it is believed that keeping it at home brings prosperity and blessings. The craftsmanship of Nettipattam reflects centuries-old temple decoration techniques, making each piece unique.",
      image: [
        "src/assets/image8.webp",
        "src/assets/image9.jpg",
        "src/assets/image10.jpg",
        "src/assets/image11.webp",
      ],

    },
  ];

  return (
    <>
      {/* HERO / INTRO SECTION */}
      <div className="intro-section">
        <img
          src="/src/assets/logo2.png"
          alt="Kavya Arts Logo"
          className="intro-logo inline-block"
        />

        <div className="elegant-quote">
          "Enchanting you since 2019. Discover the refined and exclusive collection by Kavya Arts & Craft. Expertly curated products bring grandeur to your space, ensuring uniqueness and elegance."
        </div>
      </div>

      {/* SLIDER CARDS */}
      <div className="featured-grid">
        {data.map((item, idx) => (
          <div key={idx} className="featured-card">
            {/* SLIDER */}
            <div className="w-full mb-4">
              <Slider {...settings}>
                {item.image.map((src, index) => (
                  <div key={index}>
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="w-full object-cover rounded-xl"
                    // Styles handled by CSS .featured-card .slick-slider img (aspect-ratio: 4/3)
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* TITLE */}
            <h3 className="featured-title text-center">
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="featured-desc text-center">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage2;
