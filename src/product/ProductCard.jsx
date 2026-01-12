import { GrEdit } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEye, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import ImageSlider from "../home/ImageSlider";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addToCartAPI, deleteProductByIdAPI } from "../services/service";
import "./AddProduct.css";

function ProductCard(props) {
  const navigate = useNavigate();

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
      price: item.discount ? item.discount : item.price,
      category: item.category,
      description: item.description,
      quantity: 1,
    };

    await addToCartMutation.mutateAsync(payload);
    navigate("/cart");
  };

  const truncate = (text, length = 120) =>
    text && text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <>
      {props?.details?.readproduct?.map((item) => {
        const hasDiscount =
          item.discount && item.discount < item.price;

        return (
          <div
            key={item._id}
            className="card w-96 shadow-lg m-5 text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(180deg, rgb(28,28,30), rgb(18,18,18))",
              borderRadius: "20px",
            }}
          >
            {/* IMAGE */}
            <figure
              className="px-5 pt-5 cursor-pointer relative"
              onClick={() => navigate(`/viewProduct/${item._id}`)}
            >
              <ImageSlider
                image={item.images}
                styleForImage={{
                  width: "300px",
                  height: "300px",
                  margin: "auto",
                  borderRadius: "12px",
                }}
              />

              {/* DISCOUNT BADGE */}
              {hasDiscount && (
                <span
                  className="absolute top-6 left-6 px-3 py-1 text-xs font-semibold rounded-full"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                  }}
                >
                  {item.discountPercentage}% OFF
                </span>
              )}
            </figure>

            {/* CONTENT */}
            <div className="flex flex-col p-5 gap-4">
              {/* TITLE + PRICE */}
              <div className="flex justify-between items-start">
                <h2 className="card-title text-lg leading-tight">
                  {item.pname}
                </h2>

                <div className="text-right">
                  {hasDiscount ? (
                    <>
                      <div className="text-sm text-gray-400 line-through">
                        ₹{item.price}
                      </div>
                      <div className="text-lg font-semibold text-green-400">
                        ₹{item.discount}
                      </div>
                    </>
                  ) : (
                    <div className="text-lg font-semibold">
                      ₹{item.price}
                    </div>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-300 leading-relaxed">
                {truncate(item.description, 120)}
              </p>

              {/* CATEGORY + ACTIONS */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  {item.category}
                </span>

                <div className="flex gap-4 text-lg">
                  <FaEye
                    className="cursor-pointer hover:text-blue-400 transition"
                    onClick={() =>
                      navigate(`/viewProduct/${item._id}`)
                    }
                  />
                  <GrEdit
                    className="cursor-pointer hover:text-yellow-400 transition"
                    onClick={() =>
                      navigate(`/editProduct/${item._id}`)
                    }
                  />
                  <RiDeleteBinFill
                    className="cursor-pointer hover:text-red-500 transition"
                    onClick={() =>
                      deleteProductMutation.mutateAsync(item._id)
                    }
                  />
                </div>
              </div>

              {/* STOCK + CTA */}
              <div className="flex items-center justify-between gap-3 mt-2">
                {item.instock > 0 ? (
                  <span className="badge badge-success px-3 py-2">
                    In Stock
                  </span>
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

                {item.instock > 0 ? (
                  <button
                    className="add-cart-btn compact"
                    onClick={() => addToCart(item)}
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
                          `Hi, I'm interested in this artwork:\n\n${item.pname}\nPrice: ₹${item.price}`
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
        );
      })}
    </>
  );
}

export default ProductCard;
