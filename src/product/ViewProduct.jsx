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
import { useSelector } from "react-redux";
import { useState } from "react";

/* ---------- Delete Confirmation Modal ---------- */
function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#1b1b1b] p-6 rounded-xl w-[90%] max-w-sm text-white">
        <h3 className="text-lg font-semibold mb-3">
          Delete Product?
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdAPI(id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductByIdAPI,
    onSuccess: () => navigate("/"),
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCartAPI,
  });

  const addToCart = async (item) => {
    await addToCartMutation.mutateAsync({
      productId: item._id,
      name: item.pname,
      price: item.discount,
      category: item.category,
      description: item.description,
      quantity: 1,
    });
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
      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => deleteProductMutation.mutate(id)}
        />
      )}

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
          {/* SLIDER */}
          <div
            style={{
              height: "500px",
              backgroundColor: "#141414",
              position: "relative",
            }}
          >
            {/* DISCOUNT BADGE – TOP LEFT */}
            {product?.discountPercentage > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  zIndex: 10,
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                  background:
                    "linear-gradient(135deg,#4f46e5,#2563eb)",
                  color: "#fff",
                }}
              >
                {product.discountPercentage}% OFF
              </span>
            )}

            <Slider {...settings}>
              {/* VIDEO */}
              {product?.video && (
                <div>
                  <div className="flex justify-center items-center h-[500px]">
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

              {/* IMAGES */}
              {product?.images?.map((src, index) => (
                <div key={index}>
                  <div className="flex justify-center items-center h-[500px]">
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
            {/* TITLE & PRICE */}
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
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-300 leading-relaxed">
              {product?.description}
            </p>

            {/* CATEGORY & ADMIN ACTIONS */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Category:{" "}
                <span className="text-gray-200">
                  {product?.category}
                </span>
              </div>

              {isAdmin && (
                <div className="flex gap-4 text-lg">
                  <GrEdit
                    className="cursor-pointer hover:text-blue-400"
                    onClick={() =>
                      navigate(`/editProduct/${id}`)
                    }
                  />
                  <RiDeleteBinFill
                    className="cursor-pointer hover:text-red-400"
                    onClick={() => setShowDeleteModal(true)}
                  />
                </div>
              )}
            </div>

            {/* STOCK & CTA */}
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
