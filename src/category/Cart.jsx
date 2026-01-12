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
import PageLoader from "../common/PageLoader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartAPI,
  });

  const updateCartQtyMutation = useMutation({
    mutationFn: updateCartQtyAPI,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: deleteCartItemAPI,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCartAPI,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrderAPI,
  });

  const handleCheckout = async (data) => {
    const cartDetails = { cartItems: data.cart, userId: user.id };

    try {
      const { order } = await createOrderMutation.mutateAsync(cartDetails);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Arts & Craft By Kavya",
        description: "Artwork Purchase",
        order_id: order.id,
        handler: async function (response) {
          await verifyPaymentAPI({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          alert("Payment Successful!");
          navigate("/myorder");
        },
        prefill: {
          name: "Customer Name",
          email: "customer@email.com",
          contact: "9999999999",
        },
        theme: { color: "#ff9f43" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Checkout failed");
      console.log(err);
    }
  };

  const calculateTotal = () =>
    data?.cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const changeQty = async (item, delta) => {
    await updateCartQtyMutation.mutateAsync({
      id: item._id,
      action: delta === 1 ? "increase" : "decrease",
    });
  };

  const handleRemoveClick = async (itemId) => {
    await deleteCartItemMutation.mutateAsync(itemId);
  };

  if (isLoading) {
    return (
      <div className="loader-wrap">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* LEFT - Cart Items */}
      <div className="cart-left">
        <h2 className="cart-header">Your Shopping Cart</h2>

        {!data?.cart?.length ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add artworks to your cart to see them here.</p>
          </div>
        ) : (
          <div className="cart-items">
            {data.cart.map((item) => (
              <div key={item._id} className="cart-item card">
                <img src={item.image} alt={item.name} className="cart-img" />

                <div className="cart-details">
                  <h3 className="cart-title">{item.name}</h3>
                  <p className="cart-subtitle">
                    ₹{item.price} <span className="tax-note">Inclusive of all taxes</span>
                  </p>

                  <div className="qty-box">
                    <button onClick={() => changeQty(item, -1)}>
                      {item.quantity === 1 ? "🗑" : "-"}
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQty(item, 1)}>+</button>
                  </div>
                </div>

                <div className="cart-item-total">₹{item.price * item.quantity}</div>
                <button
                  className="remove-item-btn"
                  onClick={() => handleRemoveClick(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}

            {data?.cart?.length > 0 && (
              <button
                className="clear-cart-btn"
                onClick={() => clearCartMutation.mutateAsync()}
                disabled={clearCartMutation.isPending}
              >
                Clear Cart
              </button>
            )}
          </div>
        )}
      </div>

      {/* RIGHT - Order Summary */}
      <div className="cart-right card">
        <h3>Order Summary</h3>

        <div className="row">
          <span>Subtotal</span>
          <span>₹ {calculateTotal()}</span>
        </div>

        <div className="row">
          <span>Shipping</span>
          <span className="free">Free</span>
        </div>

        <hr />

        <div className="row total">
          <span>Total</span>
          <span>₹ {calculateTotal()}</span>
        </div>

        <button className="checkout-btn" onClick={() => handleCheckout(data)}>
          Proceed to Checkout
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
  );
}
