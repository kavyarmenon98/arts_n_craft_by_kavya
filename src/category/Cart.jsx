import { createPortal } from "react-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./cart.css";
import {
  getCartAPI,
  updateCartQtyAPI,
  clearCartAPI,
  createOrderAPI,
  verifyPaymentAPI,
  deleteCartItemAPI,
} from "../services/service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

/* ---------- Skeleton Loader ---------- */
function CartSkeleton() {
  return (
    <div className="cart-page">
      <div className="cart-left">
        <div className="skeleton title" />
        <div className="skeleton card" />
      </div>
      <div className="cart-right">
        <div className="skeleton summary" />
      </div>
    </div>
  );
}

/* ---------- Address Modal ---------- */

function AddressModal({ isOpen, onClose, onSave, input, setInput }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Only close if clicked directly on the backdrop element itself
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="address-modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div
        className="address-modal-content"
        onClick={(e) => e.stopPropagation()} // optional safety layer
      >
        <h3>Edit Shipping Address</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your address"
          rows={4}
        />
        <div className="address-modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="save-btn"
            onClick={() => {
              onSave(input);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}


export default function CartPage() {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loadingItemId, setLoadingItemId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [address, setAddress] = useState(
    "123, Sample Street, City, State, Pincode"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState(address);

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartAPI,
  });

  const updateCartQtyMutation = useMutation({
    mutationFn: updateCartQtyAPI,
    onMutate: ({ id }) => setLoadingItemId(id),
    onSettled: () => {
      setLoadingItemId(null);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: deleteCartItemAPI,
    onMutate: (id) => setLoadingItemId(id),
    onSettled: () => {
      setLoadingItemId(null);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCartAPI,
    onMutate: () => setClearLoading(true),
    onSettled: () => {
      setClearLoading(false);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrderAPI,
  });

  const calculateTotal = () =>
    data?.cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;

  const changeQty = (item, delta) => {
    updateCartQtyMutation.mutate({
      id: item._id,
      action: delta === 1 ? "increase" : "decrease",
    });
  };

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      const { order } = await createOrderMutation.mutateAsync({
        cartItems: data.cart,
        userId: user.id,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Arts & Craft By Kavya",
        order_id: order.id,
        handler: async (res) => {
          await verifyPaymentAPI(res);
          navigate("/myorder");
        },
        theme: { color: "#ff9f43" },
      };

      new window.Razorpay(options).open();
    } catch {
      alert("Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (isLoading) return <CartSkeleton />;

  const openModal = () => {
    setModalInput(address);
    setIsModalOpen(true);
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-page">
        {/* LEFT */}
        <div className="cart-left">
          <h2 className="page-title">Your Shopping Cart</h2>

          {!data?.cart?.length ? (
            <div className="empty-cart">
              <h3>Your cart is empty</h3>
              <p>Add artworks you love ✨</p>
            </div>
          ) : (
            data.cart.map((item) => {
              const discount = item.isDiscounted
                ? Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) *
                  100
                )
                : 0;

              const isItemLoading = loadingItemId === item._id;

              return (
                <div key={item._id} className="cart-item animate-in">
                  {item.isDiscounted && (
                    <span className="discount-badge">{discount}% OFF</span>
                  )}

                  <button
                    className="remove-icon-btn"
                    disabled={isItemLoading}
                    onClick={() => deleteCartItemMutation.mutate(item._id)}
                  >
                    {isItemLoading ? "..." : <RiDeleteBin6Line />}
                  </button>

                  <img src={item.image} alt={item.name} />

                  <div className="cart-details">
                    <h3>{item.name}</h3>

                    <div className="price-row">
                      <span className="selling-price">₹{item.price}</span>
                      {item.isDiscounted && (
                        <span className="original-price">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>

                    {item.isDiscounted && (
                      <p className="save-text">
                        You save ₹{item.originalPrice - item.price}
                      </p>
                    )}

                    <div className="qty-box">
                      <button
                        disabled={isItemLoading}
                        onClick={() => changeQty(item, -1)}
                      >
                        {isItemLoading
                          ? "…"
                          : item.quantity === 1
                            ? "🗑"
                            : "-"}
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        disabled={isItemLoading}
                        onClick={() => changeQty(item, 1)}
                      >
                        {isItemLoading ? "…" : "+"}
                      </button>
                    </div>
                  </div>

                  <div className="item-total">₹{item.price * item.quantity}</div>
                </div>
              );
            })
          )}

          {data?.cart?.length > 0 && (
            <button
              className="clear-cart-btn"
              disabled={clearLoading}
              onClick={() => clearCartMutation.mutate()}
            >
              {clearLoading ? "Clearing..." : "Clear Cart"}
            </button>
          )}
        </div>

        {/* RIGHT */}
        <div className="cart-right animate-in">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{calculateTotal()}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">Free</span>
          </div>

          {/* Address Section */}
          <div className="summary-row address-row">
            <span>Shipping Address</span>
            <span className="address-text">
              {address}
              <button className="edit-address-btn" onClick={openModal}>
                Edit
              </button>
            </span>
          </div>

          <div className="divider" />

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{calculateTotal()}</span>
          </div>

          <button
            className="checkout-btn"
            disabled={checkoutLoading}
            onClick={handleCheckout}
          >
            {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
          </button>

          <a
            className="whatsapp-help"
            href="https://wa.me/919037009645"
            target="_blank"
            rel="noreferrer"
          >
            💬 Need help? Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={setAddress}
        input={modalInput}
        setInput={setModalInput}
      />
    </div>
  );
}
