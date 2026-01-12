import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToCartAPI,
  deleteProductByIdAPI,
  getProductByIdAPI,
} from "../services/service";
import { useNavigate, useParams } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import Slider from "react-slick";
import "./AddProduct.css";
import PageLoader from "../common/PageLoader";
import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdAPI(id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductByIdAPI,
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCartAPI,
  });

  const addToCart = async (item) => {
    const payload = {
      productId: item._id,
      name: item.pname,
      price: item.discount,
      category: item.category,
      description: item.description,
      quantity: 1,
    };

    await addToCartMutation.mutateAsync(payload);
    alert("Product added to cart!");
    navigate("/cart");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { arrows: false, dots: true },
      },
    ],
  };

  const product = data?.product;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <PageLoader />
        </div>
      ) : (
        <div
          className="card bg-base-100 shadow-sm m-5"
          style={{
            background:
              "linear-gradient(rgb(32, 31, 31) 0%, rgb(22 22 22) 100%)",
            color: "#fff",
            borderRadius: "17px",
            width: "60%",
            margin: "auto",
          }}
        >
          {/* Slider */}
          <div style={{ height: "500px", backgroundColor: "#141414" }}>
            <Slider {...settings}>
              {/* VIDEO SLIDE (FIRST) */}
              {product?.video && (
                <div>
                  <div
                    style={{
                      height: "500px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <video
                      src={product.video}
                      controls
                      autoPlay
                      muted
                      loop
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* IMAGE SLIDES */}
              {product?.images?.map((src, index) => (
                <div key={index}>
                  <div
                    style={{
                      height: "500px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col p-6 gap-6">
            {/* Title & Price */}
            <div className="flex justify-between items-start">
              <h2 className="card-title text-2xl font-semibold">
                {product?.pname}
              </h2>

              <div className="text-right">
                {product?.price && (
                  <div className="text-sm text-gray-400 line-through">
                    ₹{product.price}
                  </div>
                )}

                <div className="text-2xl font-bold text-orange-400">
                  ₹{product?.discount}
                </div>

                {product?.discountPercentage && (
                  <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              {product?.description}
            </p>

            {/* Category & Actions */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Category:{" "}
                <span className="text-gray-200">{product?.category}</span>
              </div>

              <div className="flex gap-4 text-lg">
                <GrEdit
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() => navigate(`/editProduct/${id}`)}
                />
                <RiDeleteBinFill
                  className="cursor-pointer hover:text-red-400"
                  onClick={() => deleteProductMutation.mutateAsync(id)}
                />
              </div>
            </div>

            {/* Stock & CTA */}
            <div className="flex justify-between items-center">
              <div>
                {product?.instock > 0 ? (
                  <div className="badge badge-success p-2">
                    In Stock
                  </div>
                ) : (
                  <div className="custom-badge-wrapper">
                    <span className="custom-badge">
                      Custom Made on Demand
                    </span>
                    <span className="custom-tooltip">
                      This product will be created based on customer
                      demand.
                    </span>
                  </div>
                )}
              </div>

              {product?.instock > 0 ? (
                <button
                  className="add-cart-btn compact"
                  onClick={() => addToCart(product)}
                  disabled={addToCartMutation.isPending}
                >
                  <FaShoppingCart />
                  <span>Add</span>
                </button>
              ) : (
                <button
                  className="add-cart-btn compact whatsapp"
                  onClick={() =>
                    window.open(
                      `https://wa.me/919037009645?text=${encodeURIComponent(
                        `Hi, I'm interested in this artwork:\n\n${product?.pname}\nPrice: ₹${product?.discount}`
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <FaWhatsapp />
                  <span>Enquire</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
