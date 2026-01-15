import { GrEdit } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEye, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import ImageSlider from "../home/ImageSlider";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addToCartAPI, deleteProductByIdAPI } from "../services/service";
import { useSelector } from "react-redux";
import "./AddProduct.css";

function ProductCard({ details }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductByIdAPI,
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCartAPI,
  });

  const truncate = (text, len = 90) =>
    text?.length > len ? text.slice(0, len) + "..." : text;

  return (
    <>
      {details?.readproduct?.map((item) => {
        const hasDiscount = Boolean(
          item.discount > 0 &&
          item.discount < item.price &&
          item.discountPercentage > 0
        );

        const stockLabel =
          item.instock > 0 ? "In Stock" : "Custom Made";

        const stockBadgeColor =
          item.instock > 0 ? "bg-green-600" : "bg-orange-500";

        return (
          <div
            key={item._id}
            className="w-full bg-[#121212] text-white rounded-xl shadow-lg flex flex-col"
          >
            {/* IMAGE */}
            <div
              className="relative w-full aspect-square p-6 cursor-pointer"
              onClick={() => navigate(`/viewProduct/${item._id}`)}
            >
              <ImageSlider
                image={item.images}
                styleForImage={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              {/* DISCOUNT BADGE */}
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-indigo-600 px-3 py-1 text-xs rounded-full font-semibold">
                  {item.discountPercentage}% OFF
                </span>
              )}

              {/* STOCK / CUSTOM MADE BADGE (SAME PLACE) */}
              <span
                className={`absolute top-4 right-4 ${stockBadgeColor} px-3 py-1 text-xs rounded-full font-semibold`}
              >
                {stockLabel}
              </span>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col flex-1 px-4 pb-4 gap-3">
              {/* TITLE + PRICE */}
              <div className="flex justify-between gap-3">
                <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                  {item.pname}
                </h3>

                <div className="text-right shrink-0">
                  {hasDiscount ? (
                    <>
                      <div className="text-xs text-gray-400 line-through">
                        ₹{item.price}
                      </div>
                      <div className="text-green-400 font-semibold">
                        ₹{item.discount}
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold">₹{item.price}</div>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-300">
                {truncate(item.description)}
              </p>

              {/* CATEGORY + ICONS */}
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase text-gray-400">
                  {item.category}
                </span>

                <div className="flex gap-4 text-lg">
                  <FaEye
                    className="cursor-pointer hover:text-blue-400"
                    onClick={() =>
                      navigate(`/viewProduct/${item._id}`)
                    }
                  />

                  {isAdmin && (
                    <>
                      <GrEdit
                        className="cursor-pointer hover:text-yellow-400"
                        onClick={() =>
                          navigate(`/editProduct/${item._id}`)
                        }
                      />
                      <RiDeleteBinFill
                        className="cursor-pointer hover:text-red-500"
                        onClick={() =>
                          deleteProductMutation.mutateAsync(item._id)
                        }
                      />
                    </>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                {item.instock > 0 ? (
                  <button
                    className="add-cart-btn compact w-full"
                    onClick={() => addToCartMutation.mutate(item)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                ) : (
                  <button
                    className="add-cart-btn compact whatsapp w-full"
                    onClick={() =>
                      window.open(
                        `https://wa.me/919037009645?text=${encodeURIComponent(
                          `Hi, I'm interested in ${item.pname}`
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <FaWhatsapp /> Enquire
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductCard;
