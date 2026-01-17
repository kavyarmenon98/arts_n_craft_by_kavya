import { createPortal } from "react-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCartAPI,
  updateCartQtyAPI,
  clearCartAPI,
  createOrderAPI,
  verifyPaymentAPI,
  deleteCartItemAPI,
  getUserInfoAPI,
  updateUserInfoAPI,
} from "../services/service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiShoppingBag, FiMapPin, FiTruck, FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Skeleton Loader ---------- */
function CartSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-10 w-64 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-48 w-full bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-48 w-full bg-white/5 rounded-2xl animate-pulse" />
        </div>
        <div className="h-96 w-full bg-white/5 rounded-3xl animate-pulse" />
      </div>
    </div>
  );
}

/* ---------- Address Modal ---------- */

function AddressModal({ isOpen, onClose, onSave, input, setInput, isLoading }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#161b26] border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <h3 className="text-xl font-bold text-white mb-6">Delivery Address</h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your full shipping address..."
          rows={4}
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all resize-none"
        />
        <div className="flex gap-3 mt-8">
          <button
            className="flex-1 py-3 px-6 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 px-6 rounded-xl bg-[var(--color-primary)] text-black font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            disabled={isLoading}
            onClick={() => onSave(input)}
          >
            {isLoading ? "Saving..." : "Save Address"}
          </button>
        </div>
      </motion.div>
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartAPI,
  });

  const { data: userData } = useQuery({
    queryKey: ["userBox"],
    queryFn: getUserInfoAPI,
  });

  const updateAddressMutation = useMutation({
    mutationFn: updateUserInfoAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["userBox"]);
      setIsModalOpen(false);
    }
  });

  const handleSaveAddress = (newAddress) => {
    updateAddressMutation.mutate(newAddress);
  };

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
        theme: { color: "#00a1d1" },
      };

      new window.Razorpay(options).open();
    } catch {
      toast.error("Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (isLoading) return <CartSkeleton />;

  const openModal = () => {
    setModalInput(userData?.user?.address || "");
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight flex items-center gap-4">
            <FiShoppingBag className="text-[var(--color-primary)]" /> My Bag
          </h1>
          {data?.cart?.length > 0 && (
            <button
              disabled={clearCartMutation.isPending}
              onClick={() => clearCartMutation.mutate()}
              className="text-gray-500 hover:text-red-400 text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <FiTrash2 /> {clearCartMutation.isPending ? "Clearing..." : "Empty Bag"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {!data?.cart?.length ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 border border-white/5 rounded-3xl p-20 text-center"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
                  <FiShoppingBag size={40} />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Your bag is empty</h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">Looks like you haven't added any of our handcrafted treasures yet.</p>
                <button
                  onClick={() => navigate("/listProduct")}
                  className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-black font-bold hover:opacity-90 active:scale-95 transition-all"
                >
                  Start Shopping
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {data.cart.map((item) => {
                  const discount = item.isDiscounted
                    ? Math.round(
                      ((item.originalPrice - item.price) / item.originalPrice) *
                      100
                    )
                    : 0;
                  const isItemLoading = loadingItemId === item._id;

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item._id}
                      className="group relative flex flex-col md:flex-row gap-6 bg-white/5 border border-white/5 p-5 md:p-6 rounded-3xl hover:border-white/10 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative w-full md:w-40 h-48 md:h-40 rounded-2xl overflow-hidden shrink-0 shadow-xl">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        {item.isDiscounted && (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <h3 className="text-lg font-semibold text-white leading-tight">{item.name}</h3>
                            <button
                              disabled={isItemLoading}
                              onClick={() => deleteCartItemMutation.mutate(item._id)}
                              className="p-2 bg-white/5 text-gray-400 hover:text-red-400 rounded-lg transition-all disabled:opacity-50"
                            >
                              {isItemLoading ? (
                                <div className="w-4.5 h-4.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <FiTrash2 size={18} />
                              )}
                            </button>
                          </div>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-xl font-bold text-[var(--color-primary)]">₹{item.price}</span>
                            {item.isDiscounted && (
                              <span className="text-gray-500 line-through text-sm">₹{item.originalPrice}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-black/40 border border-white/5 rounded-xl p-1">
                            <button
                              disabled={isItemLoading || item.quantity <= 1}
                              onClick={() => changeQty(item, -1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30"
                            >
                              -
                            </button>
                            <span className="w-10 text-center text-white font-bold">{item.quantity}</span>
                            <button
                              disabled={isItemLoading}
                              onClick={() => changeQty(item, 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest font-bold">Total</p>
                            <p className="text-lg font-bold text-white tracking-tight">₹{item.price * item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-[#121621] border border-white/10 p-8 rounded-[32px] shadow-2xl sticky top-32">
              <h3 className="text-xl font-bold text-white mb-8 pb-4 border-b border-white/5">Order Summary</h3>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-400 font-bold uppercase text-[10px] tracking-widest pt-1">Free</span>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5 space-y-4">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="text-[var(--color-primary)] mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Shipping to</p>
                      <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed italic pr-4 underline decoration-white/20 underline-offset-4">
                        {userData?.user?.address || "Please set your delivery address."}
                      </p>
                      {userData?.user?.phonenumber && (
                        <p className="mt-2 text-[10px] font-bold text-[var(--color-primary)] tracking-widest uppercase">
                          Contact: {userData?.user?.phonenumber}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={openModal}
                      className="text-[var(--color-primary)] text-xs font-bold hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl text-xs text-gray-400">
                    <FiTruck className="text-green-400 flex-shrink-0" />
                    <span>Estimated delivery in 5-7 business days</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-gray-400 font-medium">Grand Total</span>
                <span className="text-3xl font-serif font-black text-white tracking-tighter">₹{calculateTotal()}</span>
              </div>

              <button
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[#0077b6] text-white font-extrabold text-lg flex items-center justify-center gap-3 transition-all hover:opacity-90 active:scale-[0.98] shadow-xl shadow-[var(--color-primary)]/20 disabled:opacity-50"
                disabled={checkoutLoading || createOrderMutation.isPending || !data?.cart?.length}
                onClick={handleCheckout}
              >
                {checkoutLoading || createOrderMutation.isPending ? "Processing..." : "Secure Checkout"}
                {!(checkoutLoading || createOrderMutation.isPending) && <FiArrowRight />}
              </button>

              <div className="mt-8 text-center">
                <a
                  href="https://wa.me/919037009645"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-green-400 hover:text-green-300 font-medium flex items-center justify-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse group-hover:bg-white" />
                  Need help? Chat with an artist
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
        input={modalInput}
        setInput={setModalInput}
        isLoading={updateAddressMutation.isPending}
      />
    </div>
  );
}
