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
      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center bg-black text-white py-16 p-4 mt-3">
        <img
          src="/src/assets/logo2.png"
          alt="Kavya Arts Logo"
          className="w-72 sm:w-96 mb-6"
        />

        <div className="elegant-quote mt-6"> ENCHANTING YOU SINCE 2019. DISCOVER THE REFINED AND EXCLUSIVE COLLECTION BY KAVYA ARTS & CRAFT. EXPERTLY CURATED PRODUCTS BRING GRANDEUR TO YOUR SPACE, ENSURING UNIQUENESS AND ELEGANCE. </div>
      </div>

      {/* SLIDER CARDS */}
      <div className="px-4 sm:px-8 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="bg-linear-to-b from-zinc-800 to-black text-white rounded-2xl p-6 shadow-lg"
          >
            {/* SLIDER */}
            <div className="w-full mb-4" >
              <Slider {...settings}>
                {item.image.map((src, index) => (
                  <div key={index}>
                    <img
                      src={src}
                      style={{ width: "550px",height:'400px', borderRadius: "8px"  }}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-80 sm:h-72 object-cover rounded-xl"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* TITLE */}
            <h3 className="text-xl sm:text-2xl font-bold text-center mt-4">
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-300 text-sm sm:text-base text-center mt-3 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage2;
