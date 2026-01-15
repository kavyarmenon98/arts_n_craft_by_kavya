import { useQuery } from "@tanstack/react-query";
import { getMyOrderAPI } from "../services/service";
import { FiBox, FiCalendar, FiCreditCard } from "react-icons/fi";

export default function MyOrdersDark() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrderAPI,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-muted)] flex items-center justify-center">
        Loading your orders...
      </div>
    );
  }

  if (!data?.orders?.length) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-muted)] flex flex-col items-center justify-center gap-4">
        <FiBox size={48} className="opacity-20" />
        <p>No orders found</p>
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
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] px-4 py-8 md:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-serif text-[var(--color-primary)] mb-2">My Orders</h1>
          <p className="text-[var(--text-muted)]">
            Track your past purchases and current deliveries
          </p>
        </div>

        <div className="grid gap-6">
          {data.orders.map((order) => (
            <div
              key={order._id}
              className="glass-panel p-6 relative overflow-hidden transition-all hover:bg-[var(--bg-card-hover)]"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[rgba(255,255,255,0.05)] pb-4 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--text-main)] font-medium text-lg">
                      #{order.orderId}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <FiCalendar size={14} />
                    {new Date(order.createdAt).toDateString()}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-bold text-[var(--color-primary)]">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="py-4 space-y-4">
                {order.items.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="w-20 h-24 rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[var(--bg-page)] shrink-0">
                      <img
                        src={item.image || "https://via.placeholder.com/80"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-[var(--text-main)] text-lg leading-tight mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                        <span>Qty: {item.quantity}</span>
                        <span>₹{item.price} each</span>
                      </div>
                    </div>

                    <div className="font-medium text-[var(--text-main)]">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 pt-4 border-t border-[rgba(255,255,255,0.05)] text-sm text-[var(--text-muted)]">
                <FiCreditCard />
                <span>Payment ID: <span className="font-mono text-[var(--text-main)]">{order.paymentId}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
