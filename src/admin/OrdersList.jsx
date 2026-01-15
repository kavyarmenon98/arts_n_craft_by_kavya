import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeOrderStatusAPI,
  getAdminOrderListAPI,
} from "../services/service";
import { useState } from "react";
import { FiSettings, FiPackage, FiClock, FiCheckCircle, FiTruck, FiXCircle } from "react-icons/fi";

export default function OrdersList() {
  const queryClient = useQueryClient();
  const [activeOrder, setActiveOrder] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAdminOrderListAPI,
  });

  const changeOrderStatusMutation = useMutation({
    mutationFn: changeOrderStatusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const handleStatusChange = async (orderId, status) => {
    await changeOrderStatusMutation.mutateAsync({
      id: orderId,
      status,
    });
    setActiveOrder(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center text-[var(--text-muted)]">
        Loading orders...
      </div>
    );
  }

  if (!data?.orders?.length) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center text-[var(--text-muted)]">
        No orders found
      </div>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Shipped": return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "In Transit": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Delivered": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Cancelled": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] p-6">
      {/* Header */}
      <div className="mb-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-[var(--color-primary)] mb-2">Order Management</h1>
        <p className="text-[var(--text-muted)]">
          Manage and track customer orders efficiently
        </p>
      </div>

      <div className="space-y-6 max-w-6xl mx-auto">
        {data.orders.map((order) => (
          <div
            key={order._id}
            className="glass-panel relative p-6 transition-all hover:bg-[var(--bg-card-hover)]"
          >
            {/* STATUS + ACTION */}
            <div className="absolute top-6 right-6 flex items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusStyle(order.status)}`}>
                {order.status}
              </span>

              {/* ACTION BUTTON */}
              <div className="relative">
                <button
                  onClick={() => setActiveOrder(activeOrder === order._id ? null : order._id)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[var(--color-primary)] hover:text-black transition-colors"
                  title="Update status"
                >
                  <FiSettings size={18} />
                </button>

                {activeOrder === order._id && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1a1f2e] border border-[var(--glass-border)] rounded-xl shadow-2xl z-20 overflow-hidden backdrop-blur-xl">
                    {["Processing", "Shipped", "In Transit", "Delivered"].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(order._id, status)}
                        className="block w-full text-left px-4 py-3 text-sm text-[var(--text-muted)] hover:bg-[var(--color-primary)] hover:text-black transition-colors"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ORDER HEADER */}
            <div className="border-b border-[rgba(255,255,255,0.05)] pb-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[var(--text-muted)] text-sm">Order ID:</span>
                <span className="font-mono text-[var(--color-secondary)]">#{order.orderId}</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                <FiClock className="opacity-70" />
                {new Date(order.createdAt).toDateString()}
              </p>
            </div>

            {/* ORDER ITEMS */}
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[var(--bg-page)]">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[var(--text-main)] text-lg">{item.name}</h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {item.quantity} x <span className="text-[var(--text-main)]">₹{item.price}</span>
                    </p>
                  </div>
                  <div className="text-right font-medium text-[var(--text-main)]">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-end mt-6 pt-4 border-t border-[rgba(255,255,255,0.05)]">
              <div>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Payment ID</p>
                <code className="text-xs bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded text-[var(--text-muted)]">
                  {order.paymentId || "N/A"}
                </code>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  ₹{order.totalAmount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
